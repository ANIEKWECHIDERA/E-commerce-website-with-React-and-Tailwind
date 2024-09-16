import React from "react";
import { Routes, Route } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path="/mphxadmnctrl" element={<AdminLogin />} />
      </Routes>
    </div>
  );
};

export default Admin;
