import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Order = () => {
  const { currency, fetchUserId } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null); // State to track expanded orders

  const fetchUserOrders = async () => {
    setLoading(true);
    setError(null);
    const userId = await fetchUserId();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      const groupedOrders = sortedOrders.reduce((acc, order) => {
        const orderKey = order.orderNumber;
        if (!acc[orderKey]) {
          acc[orderKey] = { ...order, items: [] };
        }
        acc[orderKey].items.push(...order.items);
        return acc;
      }, {});

      setOrders(Object.values(groupedOrders));
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const toggleOrder = (orderNumber) => {
    setExpandedOrder((prev) => (prev === orderNumber ? null : orderNumber));
  };

  return (
    <div className="sm:mt-40 border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {loading && <p className="text-gray-500">Loading your orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              className="py-4 border-b border-gray-200"
              key={order.orderNumber}
            >
              <div
                className="flex justify-between mb-2 cursor-pointer p-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => toggleOrder(order.orderNumber)}
              >
                <h3 className="text-lg font-bold">
                  Order Number: {order.orderNumber}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              {expandedOrder === order.orderNumber && (
                <div className="flex flex-col gap-4 pl-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-6 border-b border-gray-300 pb-2"
                    >
                      <img
                        className="w-16 sm:w-20"
                        src={item.images}
                        alt="product"
                      />
                      <div>
                        <p className="sm:text-base font-medium">
                          {item.productName}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                          <p className="text-lg">
                            {currency}
                            {item.price}
                          </p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="md:w-1/2 flex justify-between mt-4">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{order.status}</p>
                </div>
                <button
                  className="border px-4 py-2 text-sm md:text-base font-medium text-gray-700 rounded-sm hover:bg-slate-100"
                  onClick={fetchUserOrders}
                  disabled={loading}
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have not made an order</p>
        )}
      </div>
    </div>
  );
};

export default Order;
