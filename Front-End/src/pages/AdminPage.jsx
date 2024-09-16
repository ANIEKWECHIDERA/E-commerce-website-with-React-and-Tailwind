import React, { useState } from "react";
import OverView from "../components/admin/OverView";
import OrdersAdmin from "../components/admin/OrdersAdmin";
import BlogAdmin from "../components/admin/BlogAdmin";
import AddProducts from "../components/admin/AddProducts";
import Inventory from "../components/admin/Inventory";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverView />;
      case "orders":
        return <OrdersAdmin />;
      case "blog":
        return <BlogAdmin />;
      case "add-products":
        return <AddProducts />;
      case "inventory":
        return <Inventory />;
      default:
        return <OverView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white  sticky top-0 h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Admin Panel
          </h2>
          <nav className="space-y-4">
            <p
              className={`block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors cursor-pointer ${
                activeSection === "overview" ? "text-blue-600 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("overview")}
            >
              Overview
            </p>
            <p
              className={`block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors cursor-pointer ${
                activeSection === "orders" ? "text-blue-600 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("orders")}
            >
              Orders
            </p>
            <p
              className={`block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors cursor-pointer ${
                activeSection === "blog" ? "text-blue-600 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("blog")}
            >
              Blog
            </p>
            <p
              className={`block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors cursor-pointer ${
                activeSection === "add-products"
                  ? "text-blue-600 border-b-2"
                  : ""
              }`}
              onClick={() => setActiveSection("add-products")}
            >
              Add Products
            </p>
            <p
              className={`block text-lg border-b text-gray-600 hover:text-blue-600 transition-colors cursor-pointer ${
                activeSection === "inventory" ? "text-blue-600 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("inventory")}
            >
              Inventory
            </p>
            <button className="text-red-500 hover:text-red-700 mt-4">
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-scroll">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
