import React from "react";
import { assets } from "../assets/assets";

const UserProfile = () => {
  return (
    <div>
      <div>
        <div className="sm:mt-40 text-center  pt-10 border-t">
          <h1 className="font-semibold text-4xl mb-10">Account Information</h1>
        </div>
        <div className="flex w-full justify-around ">
          <div className=" flex flex-col items-start w-[230px] text-left">
            <div className="flex border-b  justify-between px-4 mb-4">
              <div className="px-4">
                <img className="w-5" src={assets.profile_icon} alt="" />
              </div>
              <div className="px-4">
                <h2 className="mb-3 font-semibold">My Profile</h2>
                <p className="mb-3 active-Account-info  text-gray-500 hover:text-gray-900 cursor-pointer">
                  Account Info
                </p>
                <p className="mb-3  text-gray-500 hover:text-gray-900 cursor-pointer">
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
                <p className="mb-3  text-gray-500 hover:text-gray-900 cursor-pointer">
                  Order History
                </p>
                <p className="mb-3  text-gray-500 hover:text-gray-900 cursor-pointer">
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
                <p className="mb-3  text-gray-500 hover:text-gray-900 cursor-pointer">
                  Delete Account
                </p>
              </div>
            </div>
          </div>

          <div className="border w-[70%]"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
