import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, onClick }) => {
  const { currency } = useContext(ShopContext);

  const formatPrice = amount => {
    return new Intl.NumberFormat().format(amount);
  };

  return (
    <Link
      onClick={onClick}
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm'">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {formatPrice(price)}
      </p>
    </Link>
  );
};

export default ProductItem;
