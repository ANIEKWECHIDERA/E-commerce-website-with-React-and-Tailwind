import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 tex-sm ">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            illo vero neque. Placeat at iste eligendi ut! Facilis esse dolore in
            modi, totam distinctio eligendi, quis laborum, illum dolorum
            repellat.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flelx flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
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
