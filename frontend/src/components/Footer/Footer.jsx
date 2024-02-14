import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-50 border-t dark:border-none dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-4">
        <p className="text-xs text-gray-700 font-semibold grid gap-1.5 sm:text-sm md:gap-0 dark:text-gray-400">
          © 2023 Flutter Blocks. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
