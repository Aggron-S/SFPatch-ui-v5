import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useEffect } from "react";
import logo from "../assets/images/patchtool.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Navbar = ({
  isLoggedIn,
  handleLogOut,
  showToast,
  message,
  displayName,
}) => {
  useEffect(() => {
    if (showToast) {
      message === `Logged in successful!`
        ? toast.success(message)
        : toast.error(message);
    }
  }, [showToast, message]);

  return (
    <nav className="bg-primary-bg-500 p-3 flex items-center justify-between col-span-3 border-b-2 border-primary-purple-500 drop-shadow-lg">
      <div className="flex gap-5 items-center mx-3">
        <img src={logo} alt="" />
        <h1 className="text-text-100 text-3xl">Patch Tool</h1>
      </div>
      <div className="flex gap-4 items-center justify-center mx-3">
        <h1 className="text-text-100 text-xl">
          {isLoggedIn ? `Hello, ${displayName}` : ""}
        </h1>
        {isLoggedIn ? (
          <Link
            to="/"
            className="text-text-100 bg-primary-purple-500 p-3 rounded-md px-8 hover:bg-secondary-blue-500"
            onClick={handleLogOut}
          >
            <span className="flex flex-row gap-3 items-center">
              Log out
              <FaArrowRightFromBracket />
            </span>
          </Link>
        ) : (
          <Link
            to="/"
            className="text-text-100 bg-primary-purple-500 p-3 rounded-md px-8 hover:bg-secondary-blue-500"
          >
            <span className="flex flex-row gap-3 items-center">
              Log In
              <FaArrowRightFromBracket />
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
