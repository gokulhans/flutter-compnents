import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  const [isUser, setIsUser] = useState(localStorage.getItem("isUser"));

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-blue-100 dark:bg-gray-900 dark:text-gray-50">
        <Navbar isUser={isUser} setIsUser={setIsUser} />
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <Routes>
            {!isUser ? (
              <>
                <Route path="/" element={<Navigate to={"/signup"} />} />
                <Route path="*" element={<Navigate to={"/"} />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Home isUser={isUser} />} />
                <Route path="*" element={<Navigate to={"/"} />} />
              </>
            )}
          </Routes>
        </div>
        <Footer isUser={isUser} />
      </div>
    </>
  );
}

export default App;
