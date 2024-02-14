import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Create from "./pages/Create/Create";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white dark:bg-gray-900 dark:text-gray-50">
        <Navbar />
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <Routes>
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
