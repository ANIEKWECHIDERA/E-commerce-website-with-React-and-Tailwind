import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ isOpen, onClose, product, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setDescription(product.description);
      setImages(product.images);
      setSizes(product.sizes);
    }
  }, [product]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSave = async () => {
    if (name && category && price) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', selectedFiles[0]); // Append the first selected image file
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('sizes', sizes);

      try {
        const response = await fetch(
          `http://localhost:5000/api/products/edit/${product._id}`,
          {
            method: 'PUT',
            body: formData,
          }
        );

        const updatedProduct = await response.json();
        onSave(updatedProduct);
        setIsLoading(false);
        toast.success('Product updated successfully!');
        onClose();
      } catch (error) {
        toast.error('Error updating product.');
      }
    } else {
      toast.error('Please fill out all required fields.');
    }
  };

  useEffect(() => {
    return () => {
      // Clean up object URLs to avoid memory leaks
      images.forEach(image => {
        URL.revokeObjectURL(image);
      });
    };
  }, [images]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
            <p className="text-white">Uploading...</p>
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              <option value="Jacket">Jacket</option>
              <option value="Blazer">Blazer</option>
              <option value="Shoe">Shoe</option>
              <option value="Belt">Belt</option>
              <option value="Tie">Tie</option>
              <option value="Accessory">Accessory</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex space-x-2 mt-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  className="w-24 h-24 object-cover"
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sizes
            </label>
            <div className="flex space-x-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <label key={size} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={sizes.includes(size)}
                    onChange={e => {
                      if (e.target.checked) {
                        setSizes([...sizes, size]);
                      } else {
                        setSizes(sizes.filter(s => s !== size));
                      }
                    }}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{size}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
