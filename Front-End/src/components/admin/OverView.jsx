import React from 'react';

const OverView = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
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
          <p className="text-3xl font-bold text-gray-900">1,245</p>{' '}
          {/* Replace with dynamic data */}
        </div>

        {/* Total Number of Products */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-gray-900">325</p>{' '}
          {/* Replace with dynamic data */}
        </div>

        {/* Total Products per Category */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Products by Category
          </h2>
          <ul className="space-y-2 text-gray-900">
            <li>Jackets: 45</li> {/* Replace with dynamic data */}
            <li>Suit: 120</li>
            <li>Blazers: 50</li>
            <li>Shoes: 80</li>
            <li>Belts: 30</li>
            <li>Accessories: 50</li>
          </ul>
        </div>

        {/* Number of Blog Posts */}
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Blog Posts</h2>
          <p className="text-3xl font-bold text-gray-900">78</p>{' '}
          {/* Replace with dynamic data */}
        </div>

        {/* Number of Active Orders */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Active Orders</h2>
          <p className="text-3xl font-bold text-gray-900">34</p>{' '}
          {/* Replace with dynamic data */}
        </div>

        {/* Number of Delivered Orders */}
        <div className="bg-teal-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            Delivered Orders
          </h2>
          <p className="text-3xl font-bold text-gray-900">192</p>{' '}
          {/* Replace with dynamic data */}
        </div>
      </div>
    </div>
  );
};

export default OverView;
