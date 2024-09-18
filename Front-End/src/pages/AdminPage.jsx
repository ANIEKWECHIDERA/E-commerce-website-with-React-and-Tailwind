import React, { useEffect, useState } from "react";
import OverView from "../components/admin/OverView";
import OrdersAdmin from "../components/admin/OrdersAdmin";
import BlogAdmin from "../components/admin/BlogAdmin";
import AddProducts from "../components/admin/AddProducts";
import Inventory from "../components/admin/Inventory";
import TokenExpiredPopup from "../components/admin/TokenExpiredPopup";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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

  async function logout() {
    try {
      // Remove the token from local storage
      localStorage.removeItem("token");

      // Redirect to login page or home page
      window.location.href = "/mphxadmnlgn";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  useEffect(() => {
    async function checkTokenExpiration() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // No token, trigger login redirect
          return;
        }

        // Call API to verify token
        const response = await fetch(
          "http://localhost:5000/api/verify-token/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          // Token expired
          setPopupMessage("Session expired. Please log in again.");
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    }

    checkTokenExpiration();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white">
        <div className="p-6 mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Admin Panel
          </h2>
          <nav className="space-y-10">
            <p
              className={`block text-lg border-b text-gray-500 hover:text-gray-950 transition-colors cursor-pointer ${
                activeSection === "overview" ? "text-gray-950 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("overview")}
            >
              Overview
            </p>
            <p
              className={`block text-lg border-b text-gray-500 hover:text-gray-950 transition-colors cursor-pointer ${
                activeSection === "orders" ? "text-gray-950 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("orders")}
            >
              Orders
            </p>
            <p
              className={`block text-lg border-b text-gray-500 hover:text-gray-950 transition-colors cursor-pointer ${
                activeSection === "blog" ? "text-gray-950 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("blog")}
            >
              Blog
            </p>
            <p
              className={`block text-lg border-b text-gray-500 hover:text-gray-950 transition-colors cursor-pointer ${
                activeSection === "add-products"
                  ? "text-gray-950 border-b-2"
                  : ""
              }`}
              onClick={() => setActiveSection("add-products")}
            >
              Add Products
            </p>
            <p
              className={`block text-lg border-b text-gray-500 hover:text-gray-950 transition-colors cursor-pointer ${
                activeSection === "inventory" ? "text-gray-950 border-b-2" : ""
              }`}
              onClick={() => setActiveSection("inventory")}
            >
              Inventory
            </p>
            <button
              onClick={logout}
              className="bg-red-500 py-2 px-10 rounded text-white hover:text-red-500 hover:bg-gray-200 transition-colors"
            >
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

      {/* Popup Modal */}
      {showPopup && (
        <TokenExpiredPopup message={popupMessage} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default AdminPage;
