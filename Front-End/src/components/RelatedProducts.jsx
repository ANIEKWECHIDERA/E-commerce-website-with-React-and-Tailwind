import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, selectedProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter(
      item => item.category === category && item._id !== selectedProductId
    );
    setRelated(filteredProducts.slice(0, 5));

    // Limit to 5 products
  }, [products, category, selectedProductId]); // Include category in dependencies

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map(item => (
          <ProductItem
            key={item._id} // Use unique identifier as key
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.images[0]}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
