import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch orders from the API with search and filter
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/orders/all-orders',
          {
            params: {
              orderNumber: searchTerm,
              status: statusFilter,
              startDate,
              endDate,
            },
          }
        );

        const sortedOrder = response.data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrder);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [searchTerm, statusFilter, startDate, endDate]);

  // Notify about new orders
  useEffect(() => {
    const newOrders = orders.filter(order => order.isNewOrder);
    if (newOrders.length > 0) {
      toast.success(`You have ${newOrders.length} new order(s)!`);
    }
  }, [orders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/patch/${orderId}`, {
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(
      orders.map(order =>
        order._id === orderId
          ? { ...order, status: newStatus, isNewOrder: false }
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
        console.error('Error deleting order:', error);
      }
    }
  };

  const renderOrderDetails = order => {
    const statusButtons = [
      { text: 'Order Received', color: 'green' },
      { text: 'Packing Order', color: 'yellow' },
      { text: 'Transporting Order', color: 'blue' },
      { text: 'Delivered', color: 'green' },
      { text: 'Cancelled', color: 'red' },
    ];

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          Order ID: {order.orderNumber}
          {order.isNewOrder && (
            <span className="ml-3 bg-green-500 w-3 h-3 rounded-full"></span>
          )}
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

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setStartDate('');
    setEndDate('');
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-normal mb-6">Manage Orders</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order Number"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">All Statuses</option>
          <option value="Order Received">Order Received</option>
          <option value="Packing Order">Packing Order</option>
          <option value="Transporting Order">Transporting Order</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={resetFilters}
          className="mt-4 border text-gray-900 px-4 py-2 rounded hover:bg-gray-400 hover:text-gray-50 transition"
        >
          Reset Filters
        </button>
      </div>

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
