import React from 'react';

const UserProfileForm = () => {
  return (
    <div>
      <form className=" shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] sm:max-w-96 m-auto  gap-4 text-gray-800">
        <div className="items-center  text-left mt-3">
          <p className=" text-3xl">Update Account Info</p>
        </div>

        <div className="text-left w-full">
          <label htmlFor="First Name">First Name</label>
          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="text"
            name="firstName"
            placeholder="Enter First Name"
          />
        </div>

        <div className="text-left w-full">
          <label htmlFor="First Name">Last Name</label>
          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
          />
        </div>

        <div className="text-left w-full">
          <label htmlFor="Email Address">Email Address</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="email"
            name="email"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="text-left w-full">
          <label htmlFor="Phone Number">Phone Number</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="number"
            name="phoneNumber"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="text-left w-full">
          <label htmlFor="Password">Current Password</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="text-left w-full">
          <label htmlFor="Password">New Password</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white font-light px-8 py-2 mt-4 tracking-wider bg-black  active:bg-slate-500 relative"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
