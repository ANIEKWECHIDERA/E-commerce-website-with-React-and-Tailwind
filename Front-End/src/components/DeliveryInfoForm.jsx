import React from 'react';
import DeliveryInfoCard from '../components/DeliveryInfoCard';

const DeliveryInfoForm = () => {
  const userInfo = [
    {
      name: 'John Doe',
      address:
        ' 123 Elm Street, Springfield, IL, 123 Elm Street, Springfield, IL,',
      phoneNumber: '555-1234',
    },
    {
      name: 'John Doe',
      address: '123 Elm Street, Springfield, IL',
      phoneNumber: '555-1234',
    },
    {
      name: 'John Doe',
      address: '123 Elm Street, Springfield, IL',
      phoneNumber: '555-1234',
    },
  ];

  const handleEdit = () => {
    // Logic to handle editing
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    // Logic to handle deletion
    console.log('Delete clicked');
  };
  return (
    <div className=" shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] m-auto  gap-4 text-gray-800">
      <div className="items-center sm:text-left mt-3">
        <div className="sm:flex justify-between items-center">
          <p className="mb-5 sm:mb-0 text-center sm:text-left text-3xl">
            Delivery Info
          </p>
          <button className="flex justify-center items-center bg-black text-white py-2 px-4  hover:bg-black">
            Add New Address
          </button>
        </div>
        <hr className="w-full my-5" />
        <div className="sm:grid sm:grid-cols-2 gap-10 pb-20">
          {userInfo.map((user, index) => (
            <DeliveryInfoCard
              key={index}
              userInfo={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoForm;
