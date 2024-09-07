import React, { useState } from 'react';

const DeliveryInfoCard = ({ userInfo, onEdit, onDelete }) => {
  const { name, address, phoneNumber } = userInfo;

  return (
    <div className=" p-4 bg-white border sm:w-full mt-10 max-w-md m-auto">
      <div className="flex flex-col sm:w-80 py-3 px-7 items-start text-gray-800">
        <h2 className="text-xl max-  mb-2">{name}</h2>
        <p className="text-sm mb-1">{address}</p>
        <p className="text-sm mb-3">{phoneNumber}</p>
        <div className="flex gap-4 mt-5">
          <button
            onClick={onEdit}
            className=" bg-gray-600 text-white py-2 px-4  hover:bg-black"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-400 bg-gray-100  py-2 px-4  hover:bg-red-200 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoCard;
