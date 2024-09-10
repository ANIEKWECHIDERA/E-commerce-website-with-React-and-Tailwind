import React, { useEffect, useState } from 'react';
import DeliveryInfoCard from './DeliveryInfoCard';
import axios from 'axios';

const DeliveryInfo = () => {
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchDeliveryInfo = async () => {
    if (!userId) return; // Don't fetch if userId is not set
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}/delivery-info`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log(response.data.deliveryInfo);
      setDeliveryInfo(response.data.deliveryInfo || null);
    } catch (error) {
      setError(error);
      console.error('Error fetching delivery info:', error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    fetchDeliveryInfo();
  }, [userId]);

  const handleEdit = () => {
    // Logic to handle editing
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    // Logic to handle deletion
    console.log('Delete clicked');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] m-auto gap-4 text-gray-800">
      <div className="items-center sm:text-left mt-3">
        <div className="sm:flex justify-between items-center">
          <p className="mb-5 sm:mb-0 text-center sm:text-left text-3xl">
            Delivery Info
          </p>
          <button className="flex justify-center items-center bg-black text-white py-2 px-4 hover:bg-black">
            Add New Address
          </button>
        </div>
        <hr className="w-full my-5" />
        <div className="sm:grid sm:grid-cols-2 gap-10 pb-20">
          {deliveryInfo ? (
            <DeliveryInfoCard
              userInfo={deliveryInfo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p>No delivery information available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
