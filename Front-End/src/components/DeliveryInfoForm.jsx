import Title from './Title';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeliveryInfoForm = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    homeAddress: '',
    city: '',
    state: '',
    mobileNumber: '',
  });

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserId(response.data._id);
    } catch (err) {
      setError(err);
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    fetchUserId();
    const fetchDeliveryInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/delivery-info`
        );
        setFormData(response.data.deliveryInfo);
      } catch (error) {
        console.error('Error fetching delivery info:', error);
      }
    };

    fetchDeliveryInfo();
  }, [userId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/users/${userId}/delivery-info`,
        {
          deliveryInfo: formData,
        }
      );
      console.log(`UserId: ${userId}`);
      alert('Delivery information saved successfully!');
    } catch (error) {
      console.error('Error saving delivery info:', error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  gap-4 w-full sm:max-w-[480px]"
    >
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
      </div>
      <div className="flex gap-3">
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="First Name"
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Last Name"
        />
      </div>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        type="email"
        placeholder="Enter Email Address (Optional)"
      />
      <input
        name="homeAddress"
        value={formData.homeAddress}
        onChange={handleChange}
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        type="text"
        placeholder="Enter Home Address"
      />
      <div className="flex gap-3">
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="City"
        />
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="State"
        />
      </div>
      <input
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        type="text"
        placeholder="Mobile Number"
      />
      <button
        type="submit"
        className="mt-8 w-full bg-green-400 hover:bg-green-500 text-white font-medium py-3 px-4 rounded"
      >
        {formData.firstName ? 'Confirm Delivery Info' : 'Enter Delivery Info'}
      </button>
    </form>
  );
};

export default DeliveryInfoForm;
