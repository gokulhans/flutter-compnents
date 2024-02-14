import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DarkModeToggler from "../DarkModeToggler/DarkModeToggler";
// import LogoutButton from "../LogoutButton/LogoutButton";

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 flex h-16 w-full shrink-0 items-center px-4 md:px-6 z-50 bg-white dark:gray-900">
        <Link className="mr-6 flex items-center" to={"/"}>
          <span className="ml-2 text-lg font-semibold">
            <h2 className="font-bold">Flutter Blocks</h2>
          </span>
        </Link>
        <div className="ml-auto flex gap-2">
          <Button>
            <Link to={"/create"}>Create Block</Link>
          </Button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
