import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 w-full  text-slate-200">
      <div className="mycontainer flex justify-between p-4 items-center">
        <div className="logo font-bold text-2xl">
        <span className="text-green-500">&lt;</span>
        Password
        <span className="text-green-500">Manager/ &gt;</span>
        </div>
        
        <button className="text-white cursor-pointer font-bold bg-green-600 rounded-full flex items-center justify-between w-1/14 px-2 p-1 ring-white ring-1 hover:bg-green-800 ">
          <img className="invert" width={30} src="./icons/github.png" alt="github" />
          GitHub
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
