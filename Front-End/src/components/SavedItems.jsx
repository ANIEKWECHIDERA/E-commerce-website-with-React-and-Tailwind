import React, { useContext } from 'react';
import { products } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const SavedItems = () => {
  const { currency, products } = useContext(ShopContext);

  const productSlice = products.slice(0, 6);

  return (
    <div className=" shadow-lg pb-5 sm:px-4 sm:flex sm:flex-col items-center w-[90%] m-auto  gap-4 text-gray-800">
      <div className="items-center  text-left mt-3">
        <p className=" text-3xl">Saved Items</p>
      </div>
      <hr className="w-full my-5" />
      <div className="w-full sm:grid sm:grid-cols-3 gap-10 p-4 justify-items-center">
        {productSlice.map((item, index) => (
          <div>
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer gap-4 hover:shadow-lg p-4 rounded-sm"
            >
              <img className="w-40 mb-6" src={item.image} alt="product image" />
              <div>
                <p className="text-sm mb-2">{item.name}</p>
                <p className="text-gray-600">
                  Price:{currency} {item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
