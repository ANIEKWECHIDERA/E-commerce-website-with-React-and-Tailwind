import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import UserProfileForm from "../components/UserProfileForm";
import DeliveryInfoForm from "../components/DeliveryInfo";
import OrderHistory from "../components/OrderHistory";
import SavedItems from "../components/SavedItems";
import DeleteAccount from "../components/DeleteAccount";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <UserProfileForm />;
      case "delivery":
        return <DeliveryInfoForm />;
      case "orders":
        return <OrderHistory />;
      case "saved":
        return <SavedItems />;
      case "delete":
        return <DeleteAccount />;
      default:
        return <UserProfileForm />;
    }
  };

  useEffect(() => {
    setActiveSection("profile");
  }, []);

  useEffect(() => {
    // Hide modal if user clicks outside of it
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOptionClick = (section) => {
    setActiveSection(section);
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Modal Background */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" />
      )}

      {/* Modal Content */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed right-10 left-10 top-32 bg-white p-6 z-30 shadow-lg rounded-lg"
        >
          <div className="flex flex-col">
            <p
              className="text-gray-500 hover:text-gray-900 cursor-pointer mb-3"
              onClick={() => handleOptionClick("profile")}
            >
              Account Info
            </p>
            <p
              className="text-gray-500 hover:text-gray-900 cursor-pointer mb-3"
              onClick={() => handleOptionClick("delivery")}
            >
              Delivery info
            </p>
            <p
              className="text-gray-500 hover:text-gray-900 cursor-pointer mb-3"
              onClick={() => handleOptionClick("orders")}
            >
              Order History
            </p>
            <p
              className="text-gray-500 hover:text-gray-900 cursor-pointer mb-3"
              onClick={() => handleOptionClick("saved")}
            >
              Saved Items
            </p>
            <p
              className="text-gray-500 hover:text-gray-900 cursor-pointer mb-3"
              onClick={() => handleOptionClick("delete")}
            >
              Delete Account
            </p>
          </div>
        </div>
      )}

      <div>
        <div className="sm:hidden sm:mt-40 text-right pt-10 border-t pr-5 text-2xl">
          <button onClick={handleModalToggle}>
            <i className="bi bi-three-dots"></i>
          </button>
        </div>
        <div className="sm:mt-40 sm:flex w-full justify-around">
          <div className="hidden right-10 left-10 py-6 bg-slate-100 sm:bg-transparent z-10 sm:p-0 sm:flex mt-10 sm:h-full sm:sticky top-56 flex-col items-start justify-start sm:w-[230px] text-left">
            <div className="flex border-b justify-between px-4 mb-4">
              <div className="px-4">
                <img className="w-5" src={assets.profile_icon} alt="" />
              </div>
              <div className="px-4">
                <h2 className="mb-3 font-semibold">My Profile</h2>
                <p
                  className={`mb-3 text-gray-500 hover:text-gray-900 cursor-pointer ${
                    activeSection === "profile" ? "active-Account-info" : ""
                  }`}
                  onClick={() => setActiveSection("profile")}
                >
                  Account Info
                </p>
                <p
                  className={`mb-3 text-gray-500 hover:text-gray-900 cursor-pointer ${
                    activeSection === "delivery" ? "active-Account-info" : ""
                  }`}
                  onClick={() => setActiveSection("delivery")}
                >
                  Delivery info
                </p>
              </div>
            </div>
            <div className="flex border-b min-w-32 justify-between px-4 mb-4">
              <div className="px-4">
                <img className="w-5" src={assets.cart_icon} alt="" />
              </div>
              <div className="px-4">
                <h2 className="mb-3 font-semibold">My Orders</h2>
                <p
                  className={`mb-3 text-gray-500 hover:text-gray-900 cursor-pointer ${
                    activeSection === "orders" ? "active-Account-info" : ""
                  }`}
                  onClick={() => setActiveSection("orders")}
                >
                  Order History
                </p>
              </div>
            </div>
            <div className="flex min-w-32 justify-between px-4 mb-4">
              <div className="px-4">
                <img className="w-5" src={assets.bin_icon} alt="" />
              </div>
              <div className="px-4">
                <h2 className="mb-3 font-semibold">Delete Account</h2>
                <p
                  className={`mb-3 text-gray-500 hover:text-gray-900 cursor-pointer ${
                    activeSection === "delete" ? "active-Account-info" : ""
                  }`}
                  onClick={() => setActiveSection("delete")}
                >
                  Delete Account
                </p>
              </div>
            </div>
          </div>

          <div className="items-center border-l sm:w-[70%]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
