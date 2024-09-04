import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const generateRandomEmail = () => {
      return `user_${Math.random()
        .toString(36)
        .slice(2, 11)}@mophixconcept.com`;
    };

    try {
      if (currentState === "Sign Up") {
        //implement registration logic here
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          { ...formData, email: formData.email || generateRandomEmail() }
        );
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          setLoading(false);
          setSuccess("Account created successfully!");
        }, 2000);

        setTimeout(() => {
          navigate("/"); // Redirect to the home page or the intended page
        }, 4000);
      } else {
        //implement login logic here
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          }
        );
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          setTimeout(() => {
            setLoading(false);
            setSuccess("Logged in successfully!");
          }, 2000);

          setTimeout(() => {
            setLoading(false);
            navigate("/collection");
          }, 4000);
        }
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setError(
          error.response.data.message ||
            "An error has occurred, please refresh the page"
        );
      }, 1000);
    }
  };

  const onchangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className=" shadow-lg pb-5 px-4 flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 sm:mt-36 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {loading && (
        <p>
          {currentState === "Sign Up"
            ? "Creating your Account..."
            : "Logging you in..."}
        </p>
      )}{" "}
      {/* Loading animation */}
      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}
      {loading && <div className="loader"></div>}
      {/* Display success message */}
      {success && <p className="text-green-500">{success}</p>}
      {currentState === "login" ? (
        ""
      ) : (
        <div className="text-left w-full">
          <label htmlFor="First Name">First Name</label>
          <input
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onchangeHandler}
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
            className="w-full px-3 py-2 mt-2 border border-gray-800"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onchangeHandler}
            placeholder="Enter Last Name"
            required
          />
        </div>
      )}
      <div className="text-left w-full">
        <label htmlFor="Email Address">Email Address</label>

        <input
          className="w-full px-3 py-2 mt-2 border border-gray-800"
          type="email"
          name="email"
          value={formData.email}
          onChange={onchangeHandler}
          placeholder="Enter Email Address (Optional)"
        />
      </div>
      <div className="text-left w-full">
        <label htmlFor="Phone Number">Phone Number</label>

        <input
          className="w-full px-3 py-2 mt-2 border border-gray-800"
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onchangeHandler}
          placeholder="Enter Phone Number"
          required
        />
      </div>
      <div className="text-left w-full">
        <label htmlFor="Password">Password</label>

        <input
          className="w-full px-3 py-2 mt-2 border border-gray-800"
          type="password"
          name="password"
          value={formData.password}
          onChange={onchangeHandler}
          placeholder="Enter Password"
          required
        />
      </div>
      <div className="w-full flex justify-between text-sm mt-[8px]">
        {currentState === "login" ? (
          <p className="cursor-pointer text-xs hover:text-red-400 underline">
            Forgot Password?
          </p>
        ) : (
          ""
        )}

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
      <button
        type="submit"
        disabled={loading}
        className="text-white font-light px-8 py-2 mt-4 tracking-wider bg-black  active:bg-slate-500 relative"
      >
        {currentState === "login" ? "Login" : "Create an Account"}
      </button>
    </form>
  );
};

export default LogIn;
