import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleDeleteAccount = async e => {
    e.preventDefault();

    if (!phoneNumber || !password) {
      setErrorMessage('Please enter both phone number and password.');
      return;
    }

    try {
      // Verify the password
      const response = await axios.post(
        'http://localhost:5000/api/verify-password',
        {
          phoneNumber,
          password,
        }
      );

      if (response.status === 200) {
        setShowConfirmation(true);
        setErrorMessage('');
      }
    } catch (error) {
      // Handle specific error messages
      if (error.response?.status === 401) {
        setErrorMessage('Invalid password. Please try again.');
      } else if (error.response?.status === 404) {
        setErrorMessage('User not found. Please check your phone number.');
      } else {
        setErrorMessage(
          'An unexpected error occurred. Please try again later.'
        );
      }
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:5000/api/delete-account',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          data: { phoneNumber, password },
        }
      );

      if (response.status === 200) {
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Show success message and redirect
        alert('Account deleted.');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setErrorMessage('Account could not be deleted. Please try again.');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          'An unexpected error occurred. Please try again later.'
      );
    }
  };

  return (
    <div className="shadow-lg p-6 bg-white rounded-lg w-[90%] m-auto text-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">
        Delete Account
      </h2>
      <p className="mb-4">
        <strong>Warning:</strong> Deleting your account will permanently remove
        all your personal information and order history. This action cannot be
        undone. Please make sure you want to proceed before confirming.
      </p>
      {!showConfirmation ? (
        <form onSubmit={handleDeleteAccount} className="flex flex-col gap-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-lg mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border  p-2 w-full"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 hover:bg-gray-800"
          >
            Delete Account
          </button>
        </form>
      ) : (
        <div>
          <p className="text-red-500 mb-4">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <button
            onClick={handleConfirmDelete}
            className="bg-black text-white py-2 px-4 hover:bg-gray-800"
          >
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
