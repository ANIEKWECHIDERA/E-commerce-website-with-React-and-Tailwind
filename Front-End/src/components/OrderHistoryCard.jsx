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
    <div className="sm:mx-auto">
      <div className="sm:border p-4  my-auto w-full border-b border-dashed mb-4">
        <div className="flex flex-col text-gray-800">
          <p className=" text-lg sm:text-xl border-b-2 font-bold sm:font-semibold mb-4 ">
            Order No: {orderNumber}
          </p>
          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Date:</strong> {orderDate}
          </p>

          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Total Paid:</strong> $
            {totalPaid.toFixed(2)}
          </p>
          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Payment Method:</strong>{' '}
            {paymentMethod}
          </p>
          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Delivery Address:</strong>{' '}
            {deliveryAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
