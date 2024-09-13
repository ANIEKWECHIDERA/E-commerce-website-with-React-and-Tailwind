import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import DeliveryInfoForm from "../components/DeliveryInfoForm";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    cartItems,
    fetchUserId,
    totalAmount,
    deliveryFee,
    clearCart,
  } = useContext(ShopContext);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  useEffect(() => {
    const getDeliveryAddress = async () => {
      const userId = await fetchUserId();
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/delivery-info`
        );
        setDeliveryInfo(response.data.deliveryInfo);
      } catch (error) {
        console.error("Error fetching delivery info:", error);
      }
    };
    getDeliveryAddress();
  }, []);

  const handleOrder = async () => {
    const userId = await fetchUserId();
    try {
      const order = {
        userId,
        totalPaid: totalAmount + deliveryFee,
        paymentMethod: method,
        deliveryAddress: deliveryInfo.homeAddress,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.productId.price,
          size: item.size,
        })),
      };

      await axios.post("http://localhost:5000/api/orders", order, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Order placed successfully!");
      // add code to Clear cart after successful order
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className=" sm:mt-40 flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side */}
      <DeliveryInfoForm />
      {/* the right side */}
      <div>
        <div className="my-9 sm:my-3 w-full">
          <CartTotal />
        </div>
        <div className="mt-12 ">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* display Payment methods here */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="mt-8 w-full bg-green-400 hover:bg-green-500 text-white font-medium py-3 px-4 rounded"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
