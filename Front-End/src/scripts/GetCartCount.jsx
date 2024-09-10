import axios from "axios";

// Function to fetch cart data and return the count of unique products
const getCartCount = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // The response data should be an array of cart items
    const cartItems = response.data || [];

    // Count unique products by productId
    const uniqueProductIds = new Set(
      cartItems.map((item) => item.productId._id)
    );
    const uniqueItemCount = uniqueProductIds.size;

    return uniqueItemCount;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return 0; // Return 0 or any default value in case of an error
  }
};

export default getCartCount;
