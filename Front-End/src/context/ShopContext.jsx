import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (Props) => {
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/all");
        const data = await response.json();
        setProducts(data); // Store products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cartCount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCartCount(response.data.count);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const fetchedCartItems = response.data || [];
      setCartItems(fetchedCartItems);

      // Calculate total amount
      const amount = fetchedCartItems.reduce((acc, item) => {
        return acc + item.quantity * (item.productId?.price || 0);
      }, 0);

      setTotalAmount(amount);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    fetchCartItems();
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    // Send data to the backend
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: itemId,
          size,
          quantity: cartData[itemId][size],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token for authenticated users
          },
        }
      );

      // Update cart count after adding item
      const response = await axios.get("http://localhost:5000/api/cartCount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartCount(response.data.count);

      // Axios automatically parses the JSON response
    } catch (error) {
      // Check if the error response exists and use its message
      if (error.response) {
        toast.error(error.response.data.message || "Error adding item to cart");
      } else {
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      console.log(cartItems);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    // Send updated cart data to the backend
    try {
      await axios.post(
        "http://localhost:5000/api/cart/update",
        {
          productId: itemId,
          size,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Error updating quantity");
      } else {
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data._id;
    } catch (err) {
      setError(err);
      console.error("Error fetching user profile:", err);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      // Send request to clear the cart
      await axios.delete("http://localhost:5000/api/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Optionally, fetch the updated cart data to reflect the changes in the UI
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data);
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    cartCount,
    totalAmount,
    fetchCartCount,
    fetchCartItems,
    fetchUserId,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>{Props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
