import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";
import { SiCodeforces } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="w-full py-14 bg-gray-100 md:mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="flex justify-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="PixelNote Logo"
            />
            <span className="font-serif self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PixelNote
            </span>
          </Link>

          <div className="mt-14 flex space-x-10 justify-center items-center mb-14">
            <div className="scale-110">
              <Link
                to="https://x.com/This_div"
                target="_blank"
                className="text-gray-500 scale-150 block transition-all duration-500 hover:text-indigo-600 "
              >
                <FaXTwitter />
              </Link>
            </div>
            <div className="scale-110">
              <Link
                to="https://codeforces.com/profile/Dcoder10M?locale=en"
                target="_blank"
                className="scale-150 block  text-gray-500 transition-all duration-500 hover:text-indigo-600 "
              >
                <SiCodeforces />
              </Link>
            </div>
            <div className="scale-110">
              <Link
                to="https://github.com/Dcoder10M"
                target="_blank"
                className="scale-150 block  text-gray-500 transition-all duration-500 hover:text-indigo-600 "
              >
                <FiGithub />
              </Link>
            </div>
          </div>
          <span className="text-lg text-gray-500 text-center block">
            ©<span>PixelNote</span> 2024, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
