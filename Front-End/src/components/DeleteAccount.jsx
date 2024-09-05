import React, { useState } from 'react';

const DeleteAccount = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeleteAccount = e => {
    e.preventDefault();
    // Add logic to verify phone number and password here

    // For demonstration purposes, we'll just show a confirmation message
    if (phoneNumber && password) {
      setShowConfirmation(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter both phone number and password.');
    }
  };

  const handleConfirmDelete = () => {
    // Add logic to handle account deletion here
    console.log('Account deleted');
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
