import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="px-4 flex flex-col sm:flex-row justify-around gap-12 sm:gap-10 text-justify py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          alt="Easy Exchange Icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold text-center">Easy Exchange Policy</p>
        <p className="text-gray-400">
          We want you to love your purchase! If you're not completely satisfied,
          our easy exchange policy allows you to swap your item hassle-free,
          ensuring you find the perfect fit and style.
        </p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          alt="Quality Assurance Icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold text-center">7-Day Return Policy</p>
        <p className="text-gray-400">
          Shop with confidence! Our 7-day return policy gives you the
          flexibility to return any unworn and unused items. Just keep the tags
          on, and we’ll handle the rest.
        </p>
      </div>

      <div>
        <img
          src={assets.support_img}
          alt="Customer Support Icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold text-center">Best Customer Support</p>
        <p className="text-gray-400">
          Our dedicated support team is here to assist you with any questions or
          concerns. Whether it's sizing help or order inquiries, we ensure you
          have a seamless shopping experience.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
