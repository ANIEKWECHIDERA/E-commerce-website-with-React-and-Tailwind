import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const onSubmitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        'http://localhost:5000/api/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      setSuccessMessage(response.data.message);
      console.log(`response: ${response.data.user}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage(
        error.response?.data?.message || 'Error updating profile'
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="profile-form shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] sm:max-w-96 m-auto  gap-4 text-gray-800"
      >
        <div className="items-center  text-center mt-3">
          <p className=" text-3xl">Update Account Info</p>
          {successMessage && (
            <p className="success-message text-center text-green-500">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="error-message text-center text-red-500">
              {errorMessage}
            </p>
          )}
          {loading && <div className="loader  "></div>}
        </div>

        <div className="text-left w-full">
          <label htmlFor="First Name">First Name</label>
          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={e =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>

        <div className="text-left w-full">
          <label htmlFor="First Name">Last Name</label>
          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={e =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        <div className="text-left w-full">
          <label htmlFor="Email Address">Email Address</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="text-left w-full">
          <label htmlFor="Phone Number">Phone Number</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={e =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className="text-left w-full">
          <label htmlFor="Password">Current Password</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.currentPassword}
            onChange={e =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
            required
          />
        </div>
        <div className="text-left w-full">
          <label htmlFor="Password">New Password</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="password"
            name="new-password"
            value={formData.newPassword}
            onChange={e =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            placeholder="Enter Password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="text-white font-light px-8 py-2 mt-4 tracking-wider bg-black  active:bg-slate-500 relative"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
