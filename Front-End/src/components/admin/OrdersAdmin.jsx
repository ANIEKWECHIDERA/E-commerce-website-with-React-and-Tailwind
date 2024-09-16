import React, { useState } from 'react';

// Mock data
const mockOrders = [
  {
    id: 'ORD12345',
    date: '2024-09-10',
    products: [
      { name: 'Laptop', quantity: 1, totalAmount: 1200 },
      { name: 'Mouse', quantity: 1, totalAmount: 25 },
    ],
    status: 'Pending',
  },
  {
    id: 'ORD12346',
    date: '2024-09-11',
    products: [{ name: 'Smartphone', quantity: 2, totalAmount: 1400 }],
    status: 'Order Received',
  },
  {
    id: 'ORD12347',
    date: '2024-09-12',
    products: [{ name: 'Headphones', quantity: 1, totalAmount: 100 }],
    status: 'Packing Order',
  },
  {
    id: 'ORD12348',
    date: '2024-09-13',
    products: [{ name: 'Keyboard', quantity: 1, totalAmount: 50 }],
    status: 'Transporting Order',
  },
  {
    id: 'ORD12349',
    date: '2024-09-14',
    products: [{ name: 'Webcam', quantity: 1, totalAmount: 80 }],
    status: 'Delivered',
  },
];

const OrdersAdmin = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSelectedStatus({ ...selectedStatus, [orderId]: newStatus });
  };

  const handleDeleteOrder = orderId => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const renderOrderDetails = order => {
    const statusButtons = [
      { text: 'Order Received', color: 'green' },
      { text: 'Packing Order', color: 'yellow' },
      { text: 'Transporting Order', color: 'blue' },
      { text: 'Delivered', color: 'purple' },
    ];

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h4 className="text-lg font-semibold mb-2">Order ID: {order.id}</h4>
        <p className="text-sm text-gray-600 mb-4">Date: {order.date}</p>
        <ul className="list-disc list-inside mb-4">
          {order.products.map((product, index) => (
            <li key={index} className="mb-1">
              <span className="font-medium">{product.name}</span> - Quantity:{' '}
              {product.quantity} - Total: ${product.totalAmount}
            </li>
          ))}
        </ul>
        <p className="text-sm mb-4">
          <span className="font-bold">Status:</span> {order.status}
        </p>
        <div className="">
          {statusButtons.map(({ text, color }) => (
            <button
              key={text}
              onClick={() => handleStatusChange(order.id, text)}
              className={`bg-white text-black border-[1px] mb-2 w-60 px-4 py-2 rounded flex items-center space-x-2 ${
                selectedStatus[order.id] === text ? `border-${color}-500` : ''
              } hover:bg-gray-100 transition`}
            >
              {selectedStatus[order.id] === text && (
                <span
                  className={`w-2.5 h-2.5 rounded-full bg-${color}-500`}
                ></span>
              )}
              <span>{text}</span>
            </button>
          ))}
          <button
            onClick={() => handleDeleteOrder(order.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete Order
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Admin Panel</h1>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.id}>{renderOrderDetails(order)}</div>
        ))
      ) : (
        <p className="text-gray-600">No orders available.</p>
      )}
    </div>
  );
};

export default OrdersAdmin;
