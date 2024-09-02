import React, { useState } from "react";

const LogIn = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className=" shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "login" ? (
        ""
      ) : (
        <div className="text-left w-full">
          <label htmlFor="First Name">First Name</label>
          <input
            className="w-full px-3 py-2 mt-2 border border-grray-800"
            type="text"
            placeholder="Enter First Name"
            required
          />
        </div>
      )}

      {currentState === "login" ? (
        ""
      ) : (
        <div className="text-left w-full">
          <label htmlFor="First Name">Last Name</label>
          <input
            className="w-full px-3 py-2 mt-2 border border-grray-800"
            type="text"
            placeholder="Enter Last Name"
            required
          />
        </div>
      )}

      <div className="text-left w-full">
        <label htmlFor="Email Address">Email Address</label>

        <input
          className="w-full px-3 py-2 mt-2 border border-grray-800"
          type="email"
          placeholder="Enter Email Address"
          required
        />
      </div>

      {currentState === "login" ? (
        ""
      ) : (
        <div className="text-left w-full">
          <label htmlFor="Phone Number">Phone Number</label>

          <input
            className="w-full px-3 py-2 mt-2 border border-grray-800"
            type="email"
            placeholder="Enter Phone Number"
            required
          />
        </div>
      )}

      <div className="text-left w-full">
        <label htmlFor="Password">Password</label>

        <input
          className="w-full px-3 py-2 mt-2 border border-grray-800"
          type="password"
          placeholder="Enter Password"
          required
        />
      </div>
      {currentState === "login" ? (
        ""
      ) : (
        <div className="text-left w-full">
          <label htmlFor="Confirm Password">Confirm Password</label>{" "}
          <input
            className=" w-full px-3 py-2 mt-2 border border-grray-800"
            type="password"
            placeholder="Enter Password"
            required
          />
        </div>
      )}
      <div className="w-full flex justify-between text-sm mt-[8px]">
        <p className="cursor-pointer text-xs hover:text-red-400 underline">
          Forgot Password?
        </p>
        {currentState === "login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:text-slate-500 underline"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("login")}
            className="cursor-pointer hover:text-slate-500 underline"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="text-white font-light px-8 py-2 mt-4 tracking-wider bg-black hover:bg-slate-500">
        {/* design black button */}

        {currentState === "login" ? "Login" : "Create an Account"}
      </button>
    </form>
  );
};

export default LogIn;
