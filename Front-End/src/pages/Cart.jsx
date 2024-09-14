import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const currency = "$";
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  const inputRefs = useRef({});

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartData(response.data);
        console.log(response.data);

        setIsCartEmpty(response.data.length === 0);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartData();
  }, []);

  // Update item quantity
  const handleQuantityChange = async (productId, size, quantity) => {
    if (quantity <= 0) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/cart/cart-qty",
        {
          productId,
          quantity,
          size,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCartCount();
      setCartData(response.data);
      console.log(response.data);
      setIsCartEmpty(response.data.length === 0);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // Remove item from cart
  const handleRemoveProduct = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: { cartId: cartItemId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCartCount();
      setCartData(response.data);
      setIsCartEmpty(response.data.length === 0);

      window.location.reload();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <div className=" sm:mt-40 border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="">
        {isCartEmpty ? (
          <p className="flex justify-center items-center text-bold md:text-3xl mt-24 text-center border  sm:py-20 sm:px-40 rounded border-red-200  text-red-500">
            Your cart is empty.
          </p> // Message if cart is empty
        ) : (
          cartData.map((item, index) => {
            const productData = item.productId;

            if (!productData) {
              console.error("Product data is missing for item:", item);
              return null; // Skip rendering this item
            }

            // Create a ref for the input field
            const inputRef = React.createRef();
            inputRefs.current[item._id] = inputRef;

            return (
              <div
                className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                key={index}
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image}
                    alt="product image"
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  ref={inputRef}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (value === 0 || e.target.value === "") {
                      // Do nothing or handle the empty/zero case if needed
                      return;
                    }

                    // Call both functions with the appropriate value
                    // updateQuantity(item._id, item.size, value);
                    handleQuantityChange(productData._id, item.size, value);
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => {
                    // updateQuantity(item._id, item.size, 0);
                    handleRemoveProduct(item._id);
                  }}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="bin_icon"
                />
              </div>
            );
          })
        )}
      </div>
      {!isCartEmpty && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              {" "}
              <button
                onClick={() => navigate("/place-order")}
                className="w-full text-center bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECK-OUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
