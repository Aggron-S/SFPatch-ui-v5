import { NavLink } from "react-router-dom";
import { FaHome, FaFileExport } from "react-icons/fa";

const MenuItems = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-xl p-3 w-full bg-neutral-bg-700 border-l-4 border-l-4 border-primary-purple-500 rounded-md drop-shadow-md"
      : "text-xl p-3 w-full border-primary-bg-500 border-l-4 hover:bg-neutral-bg-700 hover:border-l-4 hover:border-primary-purple-500 rounded-md drop-shadow-md";

  return (
    <>
      <div className="bg-primary-bg-500 text-text-100">
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center content-center flex-col gap-2 m-6">
            <div className="flex items-center justify-center my-2 gap-4 py-2">
              <FaHome className="text-2xl" />
              <h1 className="text-lg">Dashboard</h1>
            </div>
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/weaponshop" className={linkClass}>
              Weapon Items
            </NavLink>
            <NavLink to="/itemshop" className={linkClass}>
              Item List
            </NavLink>
            <NavLink to="/create/weapon" className={linkClass}>
              Create Weapon
            </NavLink>
            <NavLink to="/payout" className={linkClass}>
              Payout
            </NavLink>
          </div>
          <div className="flex items-center content-center flex-col gap-2 m-6">
            <button className="text-text-100 bg-primary-purple-500 p-3 rounded-md px-8 hover:bg-secondary-blue-500 w-full">
              <span className="flex flex-row gap-3 items-center justify-center">
                Export to SFF
                <FaFileExport />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItems;
