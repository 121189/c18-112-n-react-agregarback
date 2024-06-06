import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import { closeUserOptions } from "../redux/slices/uiSlice";

const UserOptions = ({ isOpen, name, email }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeUserOptions());
  };

  return (
    isOpen && (
      <div className="absolute right-0 top-full z-10 mr-7 mt-1 flex w-64 flex-col rounded-md bg-orange-500 py-2">
        <div className="mb-2 border-b border-b-white pb-4 pt-3">
          <p className="mb-1 px-3 font-semibold">{name}</p>
          <p className="px-3">{email}</p>
        </div>
        <Link to="/profile" className="px-3 py-2 hover:bg-orange-400">
          Perfil
        </Link>
        <button
          className="px-3 py-2 text-left hover:bg-orange-400"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    )
  );
};

export default UserOptions;
