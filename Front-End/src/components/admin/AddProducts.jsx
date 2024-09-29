import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Jacket', 'Blazer', 'Shoe', 'Belt', 'Tie', 'Accessory'];
  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error('You can only upload up to 4 images.');
      return;
    }
    setImages(files);
  };

  const handleSizeChange = e => {
    const value = e.target.value;
    setSizes(
      sizes.includes(value)
        ? sizes.filter(size => size !== value)
        : [...sizes, value]
    );
  };

  const handleSubmit = async () => {
    if (
      !productName ||
      !category ||
      !price ||
      !description ||
      sizes.length === 0
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('image', images[i]);

      try {
        const response = await fetch(
          'https://e-commerce-website-with-react-and.onrender.com/api/products/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        imageUrls.push(data.imageUrl);
      } catch (error) {
        toast.error('Image upload failed.');
        return;
      }
    }

    const productData = {
      name: productName,
      category,
      bestseller: isBestseller,
      price,
      description,
      sizes,
      images: imageUrls,
    };

    try {
      const res = await fetch(
        'https://e-commerce-website-with-react-and.onrender.com/api/products/add',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        }
      );
      if (res.ok) {
        setIsLoading(false);
        toast.success('Product successfully added!');
        // Reset form fields
        setImages([]);
        setProductName('');
        setCategory('');
        setIsBestseller(false);
        setPrice('');
        setDescription('');
        setSizes([]);
      }
    } catch (err) {
      toast.error('Failed to add product.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-normal mb-6">Add New Product</h1>
      <div className="bg-white  rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-4">
            {images.length > 0 &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="max-w-40 h-auto rounded-lg shadow-md"
                />
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes
          </label>
          <div className="flex flex-wrap gap-4">
            {availableSizes.map(size => (
              <label key={size} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={size}
                  checked={sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isBestseller}
              onChange={() => setIsBestseller(!isBestseller)}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-sm font-medium">Bestseller</span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ${
            !category || !price || !description || sizes.length === 0
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          disabled={!category || !price || !description || sizes.length === 0}
        >
          Add Product
        </button>
      </div>

      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
            <p className="text-white">Uploading...</p>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AddProducts;
