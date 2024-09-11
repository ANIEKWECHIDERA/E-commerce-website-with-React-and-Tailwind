import React, { useEffect, useState } from 'react';
import DeliveryInfoCard from './DeliveryInfoCard';
import axios from 'axios';

const DeliveryInfo = () => {
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

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
    if (!userId) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}/delivery-info`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setDeliveryInfo(response.data.deliveryInfo || null);
      setFormData(response.data.deliveryInfo || {});
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
    setIsEditing(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('Saving...');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/users/${userId}/delivery-info`,

        {
          deliveryInfo: formData,
        }
      );
      setSaveMessage('Saved successfully!');
    } catch (error) {
      console.error('Error saving delivery info:', error);
      setSaveMessage('Error saving information.');
    } finally {
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        setSaveMessage('');
      }, 2000); // Hide message after 2 seconds
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] m-auto gap-4 text-gray-800">
      <div className="sm:flex gap-4">
        <div className="flex-1">
          <div className="items-center sm:text-left mt-3">
            <div className="sm:flex justify-between items-center">
              <p className="mb-5 sm:mb-0 text-center sm:text-left text-3xl">
                Delivery Info
              </p>
            </div>
            <hr className="w-full my-5" />
            <div className="sm:grid sm:grid-cols-2 gap-10 pb-20">
              {deliveryInfo ? (
                <DeliveryInfoCard userInfo={deliveryInfo} onEdit={handleEdit} />
              ) : (
                <p>No delivery information available</p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex-1 ${isEditing ? 'block' : 'hidden'} mt-4 sm:mt-0`}
        >
          <div className="bg-gray-200 p-4 rounded">
            <h2 className="text-2xl mb-4">Edit Delivery Info</h2>

            <form
              onSubmit={e => {
                e.preventDefault();
                handleSave();

                fetchDeliveryInfo();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="homeAddress"
                  value={formData.homeAddress || ''}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber || ''}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded "
                  disabled={isSaving}
                >
                  {saveMessage || 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
