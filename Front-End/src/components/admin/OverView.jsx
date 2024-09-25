import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OverView = () => {
  const [data, setData] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    productsByCategory: {},
    totalOrders: 0,
    activeOrders: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/overview');
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => fetchOverviewData(), 30000); // Call again after 5 seconds
      }
    };

    fetchOverviewData();
  }, []);

  setTimeout(() => fetchOverviewData(), 5000);

  return (
    <div className="bg-white p-6 rounded-lg ">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-gray-800">Overview</h1>
        <p className="text-gray-600">
          Quick insights into your store's performance.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Number of Customers */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Customers
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {data.totalCustomers}
          </p>{' '}
          {/* Replace with dynamic data */}
        </div>

        {/* Total Number of Products */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {data.totalProducts}
          </p>{' '}
        </div>

        {/* Total Products per Category */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Products by Category
          </h2>
          <ul className="space-y-2 text-gray-900">
            {Object.entries(data.productsByCategory).map(
              ([category, count]) => (
                <li key={category}>
                  {category}: {count}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Number of Blog Posts */}
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Blog Posts</h2>
          <p className="text-3xl font-bold text-gray-900">
            {data.totalBlogs}
          </p>{' '}
          {/* Replace with dynamic data */}
        </div>

        {/* Number of Active Orders */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Active Orders</h2>
          <p className="text-3xl font-bold text-gray-900">
            {data.activeOrders}
          </p>{' '}
          {/* Replace with dynamic data */}
        </div>

        {/* Number of Delivered Orders */}
        <div className="bg-teal-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Delivered Orders
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {data.deliveredOrders}
          </p>{' '}
          {/* Replace with dynamic data */}
        </div>
      </div>
    </div>
  );
};

export default OverView;
