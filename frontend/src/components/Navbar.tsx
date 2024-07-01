import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    // console.log(isActive);
  }, []);
  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          localStorage.removeItem("token");
          Swal.fire({
            title: "Logged out successfully",
            icon: "success"
          });
          navigate("/");
        } catch (e) {
          Swal.fire({
            title: "Error!",
            text: "can't logout. Try later",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
        
      }
    });
    
  }
  return (
    <header className="z-30 bg-white/90 shadow fixed top-0 w-full">
      <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center ">
      <Link to="/" className="flex justify-center space-x-3 rtl:space-x-reverse md:ml-4">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="PixelNote Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-serif">
              PixelNote
            </span>
          </Link>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start mt-0 ml-0"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          {isActive ? (
              <>
            <li className="text-gray-600  hover:text-blue-600">
            <Link
                  to="/signin"
                  className="relative inline-flex items-center justify-start  px-6 py-3 text-lg overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group md:mr-2"
                >
                  <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                    Sign in
                  </span>
                </Link>
            </li>
            <li className="text-gray-600  hover:text-blue-600">
            <Link
                  to="/signup"
                  className="relative inline-flex items-center justify-start px-6 py-3 text-lg overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group md:ml-2"
                >
                  <span className="w-48 h-48 rounded rotate-[-40deg] bg-black absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                    Sign up
                  </span>
                </Link>
            </li>
            </>)
            :
            (<>
            <li className="text-gray-600 md:mr-12 hover:text-blue-600">
            <Link
                to="/createBlog"
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-blue-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Create
                </span>
              </Link>
            </li>
            <li className="text-gray-600  hover:text-blue-600">
            <button
                onClick={handleLogout}
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Log out
                </span>
              </button>
            </li>
            </>)
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};
