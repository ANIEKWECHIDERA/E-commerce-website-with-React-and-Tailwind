import React from 'react';

const OrderHistoryCard = ({ order }) => {
  const {
    orderDate,

    totalPaid,
    paymentMethod,
    orderNumber,
    deliveryAddress,
  } = order;

  return (
    <div className="mx-auto">
      <div className="border p-4  my-auto w-full  mb-4">
        <div className="flex flex-col text-gray-800">
          <p className="text-xl font-semibold mb-2">Order No: {orderNumber}</p>
          <p className="text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Date:</strong> {orderDate}
          </p>

          <p className="text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Total Paid:</strong> $
            {totalPaid.toFixed(2)}
          </p>
          <p className="text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Payment Method:</strong>{' '}
            {paymentMethod}
          </p>
          <p className="text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Delivery Address:</strong>{' '}
            {deliveryAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
