import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleUserOptions } from "../redux/slices/uiSlice";
import SearchForm from "./SearchForm";
import UserOptions from "./UserOptions";

const Navbar = () => {
  const {
    isLoggedIn,
    user: { name, email },
  } = useSelector((state) => state.user);
  const { userOptionsIsOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleToggleUserOptions = () => {
    dispatch(toggleUserOptions());
  };

  return (
    <nav className="sticky top-0 z-20 flex h-16 w-full items-center bg-orange-500 px-7 text-white shadow-md">
      <a href="/" className="text-2xl font-semibold">
        QUERAPIDA
      </a>
      <SearchForm />
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link
              className="mr-6 rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-300"
              to="/create-recipe"
            >
              Nueva receta
            </Link>
            <div
              className="relative cursor-pointer"
              onClick={handleToggleUserOptions}
            >
              <svg
                className="h-8 w-8"
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                ></path>
              </svg>
            </div>
          </>
        ) : (
          <>
            <Link
              className="mr-2 rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-300"
              to="/login"
            >
              Ingresar
            </Link>
            <Link
              className="rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-300"
              to="/sign-up"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
      {isLoggedIn && (
        <UserOptions isOpen={userOptionsIsOpen} name={name} email={email} />
      )}
    </nav>
  );
};

export default Navbar;
