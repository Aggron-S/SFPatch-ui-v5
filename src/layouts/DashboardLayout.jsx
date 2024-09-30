import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import MenuItems from "../components/MenuItems";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({
  isLoggedIn,
  handleLogOut,
  showToast,
  message,
  displayName,
}) => {
  return (
    <>
      <div className="grid grid-cols-30/70 grid-rows-20/80 h-screen">
        <Navbar
          displayName={displayName}
          isLoggedIn={isLoggedIn}
          handleLogOut={handleLogOut}
          showToast={showToast}
          message={message}
        />
        <MenuItems />
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};

export default DashboardLayout;
