import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 tex-sm ">
        <div>
          <img src={assets.logo} alt="Company Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            At Mophix Concept, we are dedicated to providing high-quality men's
            suits and accessories that elevate your style for any occasion. With
            a commitment to craftsmanship and customer satisfaction, we strive
            to deliver exceptional products and an effortless shopping
            experience. Join us in redefining men's fashion!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-7 text-gray-600">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <li className="hover:text-gray-900">Home</li>
            </Link>
            <Link
              to="/about"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <li className="hover:text-gray-900">About Us</li>
            </Link>
            <Link
              to="/collection"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <li className="hover:text-gray-900">Shop</li>
            </Link>
            <Link
              to="/blog"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <li className="hover:text-gray-900">Blog</li>
            </Link>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flelx flex-col gap-1 text-gray-600">
            <li>+234 818 765 7654</li>
            <li>Info@mophixconcept.com</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-10 text-center text-gray-600">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright {new Date().getFullYear()} mophixconcept.com - All Rights
          Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
