import React, { useState } from 'react';

const OrderHistoryCard = ({ order }) => {
  const {
    orderDate,
    totalPaid,
    paymentMethod,
    orderNumber,
    deliveryAddress,
    status,
    items,
  } = order;

  const [isExpanded, setIsExpanded] = useState(false);
  const formatPrice = amount => {
    return new Intl.NumberFormat().format(amount);
  };

  return (
    <div className="sm:mx-auto">
      <div className="sm:border p-4 my-auto w-full border-b border-dashed mb-4  bg-white">
        <div className="flex flex-col text-gray-800">
          <button
            className="text-lg sm:text-xl font-bold sm:font-semibold mb-4 border-b-2 cursor-pointer bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-900 transition"
            onClick={() => setIsExpanded(!isExpanded)} // Click to expand/collapse
          >
            Order No: {orderNumber}
          </button>
          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Date:</strong>{' '}
            {new Date(orderDate).toLocaleDateString()}
          </p>

          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Total Paid:</strong> ₦
            {formatPrice(totalPaid.toFixed(2))}
          </p>
          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Payment Method:</strong>{' '}
            {paymentMethod}
          </p>
          <p className="text-base sm:text-lg mb-1 text-gray-400">
            <strong className="text-gray-500 text-lg">Delivery Address:</strong>{' '}
            {deliveryAddress}
          </p>

          {/* Order Status Indicator */}
          <p
            className={`text-base sm:text-lg mb-1 ${
              status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'
            }`}
          >
            <strong className="text-gray-500 text-lg">Status:</strong> {status}
          </p>

          {/* Expandable items list */}
          {isExpanded && items && (
            <div className="mt-2">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside">
                {items.map(item => (
                  <li key={item.productId}>
                    {item.name} (x{item.quantity}) - ₦
                    {formatPrice(item.price.toFixed(2))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
