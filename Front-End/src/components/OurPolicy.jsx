import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="px-4 flex flex-col sm:flex-row justify-around gap-12 sm:gap-10 text-justify py-20 text-xs sm:text-sm md:text-base text-gray-700 ">
      <div>
        <img
          src={assets.exchange_icon}
          alt="exchange_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold text-center">Easy Exchage Policy</p>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius dolores
          quam quisquam odio iusto illum culpa impedit placeat, sit at nisi
          soluta sint maxime veniam quibusdam sequi quo, aliquam fugiat?
        </p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          alt="quality_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold text-center">7 Days Return Policy</p>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius dolores
          quam quisquam odio iusto illum culpa impedit placeat, sit at nisi
          soluta sint maxime veniam quibusdam sequi quo, aliquam fugiat?
        </p>
      </div>

      <div>
        <img
          src={assets.support_img}
          alt="exchange_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold text-center">Best Customer Support</p>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius dolores
          quam quisquam odio iusto illum culpa impedit placeat, sit at nisi
          soluta sint maxime veniam quibusdam sequi quo, aliquam fugiat?
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
