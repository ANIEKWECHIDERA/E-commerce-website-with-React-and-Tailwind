import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);
  const { setShowSearch, cartCount, lastName } = useContext(ShopContext);
  const navigate = useNavigate();

  async function logout() {
    try {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const handleNavigation = () => {
    navigate('/orders');
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <div className="relative mb-24">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between py-5 font-medium max-w-7xl mx-auto px-4 md:px-8">
          <Link to="/">
            <img
              src={assets.logo}
              className="w-20 sm:w-28 md:w-36"
              alt="Site Logo"
            />
          </Link>

          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>Home</p>
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1"
            >
              <p>Collection</p>
            </NavLink>
            <NavLink to="/blog" className="flex flex-col items-center gap-1">
              <p>Blog</p>
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>About</p>
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
              <p>Contact</p>
            </NavLink>
          </ul>

          <div className="flex items-center gap-6">
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              alt="Search Icon"
              className="w-5 cursor-pointer"
            />
            <Link to="/cart" className=" relative">
              <img
                src={assets.cart_icon}
                alt="Cart Icon"
                className="w-5 min-w-5"
              />
              {isAuthenticated && (
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                  {cartCount}
                </p>
              )}
            </Link>
            <div className="group hidden sm:block relative">
              <img
                src={assets.profile_icon}
                alt="Profile Icon"
                className="w-5 cursor-pointer"
              />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-40 py-3 px-3 bg-slate-100 text-gray-500 rounded">
                  <div>
                    {isAuthenticated && !loading && (
                      <p className="text-black underline font-semibold">
                        Hello, {lastName.lastName}
                      </p>
                    )}
                  </div>
                  {isAuthenticated && (
                    <Link to={'/UserProfile'}>
                      <p className="cursor-pointer hover:text-black">
                        My Account
                      </p>
                    </Link>
                  )}
                  {isAuthenticated && (
                    <p
                      onClick={handleNavigation}
                      className="cursor-pointer hover:text-black"
                    >
                      Orders
                    </p>
                  )}
                  {isAuthenticated ? (
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Log-Out
                    </p>
                  ) : (
                    <Link to="/login">
                      <p className="cursor-pointer hover:text-black text-center">
                        Login / Sign up
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <img
              src={assets.menu_icon}
              alt="Menu Icon"
              className="w-5 cursor-pointer relative sm:hidden"
              onClick={() => setVisible(true)}
            />
          </div>
          {/* Sidebar Menu For Small Screen */}
          <div
            className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visible ? 'w-full' : 'w-0'
            }`}
          >
            <div className="flex flex-col text-gray-600">
              <div
                className="flex items-center gap-4 p-3"
                onClick={() => setVisible(false)}
              >
                <img
                  src={assets.dropdown_icon}
                  alt="drop down Icon"
                  className="h-4 rotate-180"
                />
                <p>Back</p>
              </div>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-5 border"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-5 border"
                to="/collection"
              >
                Collection
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-5 border"
                to="/blog"
              >
                Blog
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-5 border"
                to="/about"
              >
                About Us
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-5 border"
                to="/contact"
              >
                Contact
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-5 border"
                to="/cart"
              >
                Cart
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-5 border"
                  to="/UserProfile"
                >
                  My Account
                </NavLink>
              )}
              {isAuthenticated ? (
                <p
                  onClick={() => {
                    setVisible(false);
                    logout();
                  }}
                  className="cursor-pointer py-2 pl-5 border hover:text-black"
                >
                  Log-Out
                </p>
              ) : (
                <Link to="/login" onClick={() => setVisible(false)}>
                  <p className="cursor-pointer sm:hover:text-black text-center bg-black text-gray-100">
                    Login / Sign up
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
