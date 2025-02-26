import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../authContext"; // Import AuthContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext); // Access auth state

  return (
    <nav className="bg-indigo-300 dark:bg-gray-800 shadow-lg z-50 relative py-5 transition-all duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-10"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
            Cloud Vault
          </span>
        </a>

        {/* Buttons */}
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">
                {({ isActive }) => (
                  <button
                    className={`text-base font-medium rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 transition-all shadow-md ${
                      isActive
                        ? "bg-black text-white dark:bg-gray-100 dark:text-black"
                        : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Login
                  </button>
                )}
              </NavLink>
              <NavLink to="/signup">
                {({ isActive }) => (
                  <button
                    className={`text-base font-medium rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 transition-all shadow-md ${
                      isActive
                        ? "bg-black text-white dark:bg-gray-100 dark:text-black"
                        : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Signup
                  </button>
                )}
              </NavLink>
            </>
          ) : (
            <NavLink to="/">
              <button
                onClick={logout}
                className="text-base font-medium text-white dark:text-gray-900 bg-rose-600 hover:bg-rose-700 rounded-md border border-rose-500 px-4 py-2 shadow-md"
              >
                Logout
              </button>
            </NavLink>
          )}
        </div>

        {/* Navbar Links */}
        <div
          className={`$ {isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-teal-300 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative block py-3 px-4 md:p-0 text-lg transition-all duration-300 ${
                    isActive
                      ? "text-gray-900 dark:text-gray-300 font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-black dark:after:bg-white"
                      : "text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-400"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative block py-3 px-4 md:p-0 text-lg transition-all duration-300 ${
                    isActive
                      ? "text-gray-900 dark:text-gray-300 font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-black dark:after:bg-white"
                      : "text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-400"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative block py-3 px-4 md:p-0 text-lg transition-all duration-300 ${
                    isActive
                      ? "text-gray-900 dark:text-gray-300 font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-black dark:after:bg-white"
                      : "text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-400"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;