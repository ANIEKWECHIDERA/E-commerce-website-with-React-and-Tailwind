import React, { useState } from "react";
import { assets } from "../assets/assets";
import UserProfileForm from "../components/UserProfileForm";
import DeliveryInfoForm from "../components/DeliveryInfoForm";
import OrderHistory from "../components/OrderHistory";
import SavedItems from "../components/SavedItems";
import DeleteAccount from "../components/DeleteAccount";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("Profile");

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

  return (
    <div>
      <div>
        <div className=" sm:mt-40 text-center pt-10 border-t"></div>
        <div className="flex w-full justify-around ">
          <div className=" flex mt-10  h-full  sticky top-56 flex-col items-start w-[230px] text-left">
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
            <div className="flex border-b min-w-32 justify-between   px-4 mb-4">
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
                <p
                  className={`mb-3 text-gray-500 hover:text-gray-900 cursor-pointer ${
                    activeSection === "saved" ? "active-Account-info" : ""
                  }`}
                  onClick={() => setActiveSection("saved")}
                >
                  Saved Items
                </p>
              </div>
            </div>
            <div className="flex  min-w-32 justify-between  px-4 mb-4">
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

          <div className=" items-center border-l w-[70%]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
