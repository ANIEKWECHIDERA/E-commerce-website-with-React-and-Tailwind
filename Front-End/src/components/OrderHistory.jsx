import React from 'react';
import OrderHistoryCard from './OrderHistoryCard';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrders();
  }, [userId]);

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
