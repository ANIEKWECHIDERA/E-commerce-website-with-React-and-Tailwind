import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (Props) => {
  const currency = "₦";
  const deliveryFee = 10;

  const value = { products, currency, deliveryFee };

  return (
    <ShopContext.Provider value={value}>{Props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
