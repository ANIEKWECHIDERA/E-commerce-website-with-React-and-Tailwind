import React, { useContext, useEffect, useState } from 'react';
import OrderHistoryCard from './OrderHistoryCard';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { fetchUserId } = useContext(ShopContext);
  const userId = fetchUserId();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = await fetchUserId();
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, []);

  return (
    <div className="shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] m-auto gap-4 text-gray-800">
      <div className="items-center text-left mt-3">
        <p className="text-3xl">My Orders</p>
      </div>
      <hr className="w-full my-5" />
      <div className="sm:w-[80%]">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderHistoryCard key={index} order={order} />
          ))
        ) : (
          <p className="w-full text-center">You have not made an order</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
