import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between w-full bg-gray-500 py-4 px-20">
      <h1 className="font-bold text-2xl">TODO</h1>
      {!localStorage.getItem('userId') ? <div className="flex gap-2">
        <Link
            to={'/login'}
          className="bg-gray-700 px-4 py-2 text-gray-200 rounded-sm hover:bg-gray-200 hover:text-gray-700 duration-300 cursor-pointer"
        >
          Login
        </Link>
        <Link
        to={'/register'}
          className="bg-gray-700 px-4 py-2 text-gray-200 rounded-sm hover:bg-gray-200 hover:text-gray-700 duration-300 cursor-pointer"
        >
          Register
        </Link>
      </div> :
      <button
        className="bg-gray-700 px-4 py-2 text-gray-200 rounded-sm hover:bg-gray-200 hover:text-gray-700 duration-300 cursor-pointer"
        onClick={() => handleLogout()}
      >
        Logout
      </button>}
    </div>
  );
}

export default Navbar;
