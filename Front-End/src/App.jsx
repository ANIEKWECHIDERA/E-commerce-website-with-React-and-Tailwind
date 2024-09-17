import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LogIn from "./pages/LogIn";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Blog from "./pages/Blog";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";

const App = () => {
  const location = useLocation();

  // Define routes where you don't want to show NavBar and Footer
  const hideNavBarFooterRoutes = ["/mphxadmnlgn", "/mphxadmnctrl"];

  // Check if the current route is in the list
  const shouldHideNavBarFooter = hideNavBarFooterRoutes.includes(
    location.pathname
  );

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      {/* Conditionally render NavBar and SearchBar */}
      {!shouldHideNavBarFooter && (
        <>
          <NavBar />
          <SearchBar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mphxadmnlgn" element={<AdminLogin />} />
        <Route path="/mphxadmnctrl" element={<AdminPage />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/UserProfile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideNavBarFooter && <Footer />}
    </div>
  );
};

export default App;
