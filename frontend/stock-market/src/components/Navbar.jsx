import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-cyan-500">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="w-full md:w-auto">
          <ul className="text-2xl flex flex-col p-4 md:p-0 mt-1 border border-cyan-200 rounded-lg md:flex-row md:space-x-8">
            <li>
              <a href="/" className="block py-2 px-3 text-white ">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
