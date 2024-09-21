import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/orders/all-orders'
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Notify about new orders
  useEffect(() => {
    const newOrders = orders.filter(order => order.isNew);
    if (newOrders.length > 0) {
      toast.success(`You have ${newOrders.length} new order(s)!`);
    }
  }, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map(order =>
        order._id === orderId
          ? { ...order, status: newStatus, isNew: false }
          : order
      )
    );
  };

  const handleDeleteOrder = async orderId => {
    const confirmed = window.confirm('Are you sure you want to delete');

    if (confirmed) {
      try {
        await axios.delete(
          `http://localhost:5000/api/orders/delete/${orderId}`
        );
        setOrders(orders.filter(order => order._id !== orderId));
      } catch (error) {
        console.error(error);
        'Error deleting order:', error;
      }
    }
  };

  const renderOrderDetails = order => {
    const statusButtons = [
      { text: 'Order Received', color: 'green' },
      { text: 'Packing Order', color: 'yellow' },
      { text: 'Transporting Order', color: 'blue' },
      { text: 'Delivered', color: 'green' },
    ];

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          Order ID: {order.orderNumber}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Date: {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <ul className="list-disc list-inside mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="mb-1">
              <span className="font-medium">
                Product Name: {item.productName}
              </span>{' '}
              - Quantity: {item.quantity} - Sub-Total: $
              {item.price * item.quantity}
            </li>
          ))}
          <li className="mt-10 border-t">
            Total: - $
            {order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </li>
        </ul>
        <p className="text-sm mb-4">
          <span className="font-bold">Status:</span> {order.status}
        </p>
        <div>
          {statusButtons.map(({ text, color }) => (
            <button
              key={text}
              onClick={() => handleStatusChange(order._id, text)}
              className={`bg-white text-black border-[1px] mb-2 w-60 px-4 py-2 rounded flex items-center space-x-2 ${
                order.status === text ? `border-${color}-500` : ''
              } hover:bg-gray-100 transition`}
            >
              {order.status === text && (
                <span
                  className={`w-2.5 h-2.5 rounded-full bg-${color}-500`}
                ></span>
              )}
              <span>{text}</span>
            </button>
          ))}
          <button
            onClick={() => handleDeleteOrder(order._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete Order
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-normal mb-6">Manage Orders</h1>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order._id}>{renderOrderDetails(order)}</div>
        ))
      ) : (
        <p className="text-gray-600">No orders available.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default OrdersAdmin;
