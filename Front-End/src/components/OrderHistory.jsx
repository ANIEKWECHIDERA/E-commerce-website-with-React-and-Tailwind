import React from 'react';
import OrderHistoryCard from './OrderHistoryCard';

const OrderHistory = () => {
  const orders = [
    {
      orderDate: '2024-09-01',
      deliveryStatus: 'Shipped',
      totalPaid: 99.99,
      paymentMethod: 'Credit Card',
      orderNumber: '1234567890',
      deliveryAddress: '123 Elm Street, Springfield, IL',
    },
    {
      orderDate: '2024-08-15',
      deliveryStatus: 'Delivered',
      totalPaid: 49.5,
      paymentMethod: 'PayPal',
      orderNumber: '0987654321',
      deliveryAddress: '456 Oak Avenue, Springfield, IL',
    },
    {
      orderDate: '2024-08-15',
      deliveryStatus: 'Delivered',
      totalPaid: 49.5,
      paymentMethod: 'PayPal',
      orderNumber: '0987654321',
      deliveryAddress: '456 Oak Avenue, Springfield, IL',
    },
    {
      orderDate: '2024-08-15',
      deliveryStatus: 'Delivered',
      totalPaid: 49.5,
      paymentMethod: 'PayPal',
      orderNumber: '0987654321',
      deliveryAddress: '456 Oak Avenue, Springfield, IL',
    },
  ];

  return (
    <div className=" shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] m-auto  gap-4 text-gray-800">
      <div className="items-center  text-left mt-3">
        <p className=" text-3xl">My Orders</p>
      </div>
      <hr className="w-full my-5" />
      <div className="sm:w-[80%]">
        {orders.map((order, index) => (
          <OrderHistoryCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
