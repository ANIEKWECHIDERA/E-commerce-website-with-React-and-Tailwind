import React from "react";
import OverView from "../components/admin/OverView";
import OrdersAdmin from "../components/admin/OrdersAdmin";
import BlogAdmin from "../components/admin/BlogAdmin";

const AdminPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Admin Panel
          </h2>
          <nav className="space-y-4">
            <a
              href="#overview"
              className="block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors"
            >
              Overview
            </a>
            <a
              href="#orders"
              className="block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors"
            >
              Orders
            </a>
            <a
              href="#blog"
              className="block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors"
            >
              Blog
            </a>
            <a
              href="#add-products"
              className="block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors"
            >
              Add Products
            </a>
            <a
              href="#inventory"
              className="block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors"
            >
              Inventory
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-scroll">
        {/* Placeholder content for the selected section */}
        <div className="bg-white p-8 rounded-lg shadow-md ">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            <BlogAdmin />
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
