import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex sm:mt-40 flex-col sm:flex-row border border-gray-400">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">WELCOME TO</p>
          </div>
          <h1 className=" prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Abuja's No.1
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm md:text-base">Suit Store</p>
            <p className="w-8 md:w11 h-[2px] bg-[#414141]"> </p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}

      <img src={assets.hero_img} alt="hero image" className="w-full sm:w-1/2" />
    </div>
  );
};

export default Hero;
