import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogoutButton = ({ setIsUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setIsUser(false);
    toast.success("Logout Successfully!");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="group inline-flex flex-shrink-0 justify-center items-center h-9 w-9 font-medium rounded-full text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
    </button>
  );
};

export default LogoutButton;
