import React, { useContext, useEffect, useState } from 'react';
import Modal from './InventoryModal';
import { ShopContext } from '../../context/ShopContext';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { currency } = useContext(ShopContext);

  const handleEdit = product => {
    setEditProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          'https://e-commerce-website-with-react-and.onrender.com/api/products/all'
        );
        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setProducts(sortedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleSave = async updatedProduct => {
    try {
      const response = await fetch(
        `https://e-commerce-website-with-react-and.onrender.com/api/products/edit/${updatedProduct._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedData = await response.json();
      setProducts(
        products.map(product =>
          product._id === updatedData._id ? updatedData : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setEditProduct(null);
      setModalOpen(false);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(
          `https://e-commerce-website-with-react-and.onrender.com/api/products/delete/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const productCount = filteredProducts.length;

  const formatPrice = amount => {
    return new Intl.NumberFormat().format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-normal mb-6">Inventory Management</h1>
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Categories</option>
              <option value="Jacket">Jacket</option>
              <option value="Blazer">Blazer</option>
              <option value="Shoe">Shoe</option>
              <option value="Belt">Belt</option>
              <option value="Tie">Tie</option>
              <option value="Accessory">Accessory</option>
            </select>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">
              Total Products: {productCount}
            </h2>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product._id}
              className="bg-gray-50 shadow-md rounded-lg p-6 mb-4"
            >
              <div className="flex mb-4">
                <div className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Category: {product.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Price: {currency}
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Description: {product.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    Sizes: {product.sizes.join(', ') || 'N/A'}
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products available.</p>
        )}
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          product={editProduct}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Inventory;
