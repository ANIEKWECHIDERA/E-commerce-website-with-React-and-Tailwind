import React from 'react';

const DeliveryInfoCard = ({ userInfo, onEdit, onDelete }) => {
  const { firstName, lastName, email, homeAddress, city, state, mobileNumber } =
    userInfo;

  return (
    <div className="p-4 bg-white border sm:w-full mt-10 max-w-md m-auto shadow-md rounded-lg">
      <div className="flex flex-col sm:w-80 py-3 px-7 items-start text-gray-800">
        <h2 className="text-xl font-semibold mb-2">
          {firstName} {lastName}
        </h2>
        <p className="text-sm mb-1">{email || 'No email provided'}</p>
        <p className="text-sm mb-1">{homeAddress || 'No address provided'}</p>
        <p className="text-sm mb-1">{city || 'No city provided'}</p>
        <p className="text-sm mb-1">{state || 'No state provided'}</p>
        <p className="text-sm mb-3">
          {mobileNumber || 'No phone number provided'}
        </p>
        <div className="flex gap-4 mt-5">
          <button
            onClick={onEdit}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 bg-gray-100 py-2 px-4 rounded hover:bg-red-200 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoCard;
