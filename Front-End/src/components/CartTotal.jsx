import React, { useContext, useEffect, useState } from 'react';

import Title from './Title';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { currency, deliveryFee, totalAmount } = useContext(ShopContext);

  const getCartAmount = () => totalAmount;

  useEffect(() => {
    getCartAmount();
  }, []);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className="flex flex-col gap-2 mt-8 text-sm">
        <div className="flex justify-between">
          <p>Sub-Total</p>
          <p>
            {currency} {getCartAmount().toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {deliveryFee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {(getCartAmount() + deliveryFee).toFixed(2)}
          </b>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CartTotal;
