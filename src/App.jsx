import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";
import { Execute } from "./api/ApiClient";
import { toast } from "react-toastify";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginLayout from "./layouts/LoginLayout";
import HomePage from "./pages/HomePage";
import WeaponShopPage from "./pages/WeaponShopPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateWeaponPage from "./pages/CreateWeaponPage";
import ItemShopPage from "./pages/ItemShopPage";
import EditPage from "./pages/EditPage";
import CreatePayoutPage from "./pages/CreatePayoutPage";
import { weaponLoader, itemLoader } from "./components/loader/Loader";

const App = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Execute("/v2/auth/login", "POST", {
      username: e.target.username.value,
      password: e.target.password.value,
    })
      .then((token) => {
        sessionStorage.setItem("authToken", token.token);
        setToken(token.token);
        setIsLoggedIn(true);
        setShowToast(true);
        const username = e.target.username.value;
        const formattedDisplayName =
          username[0].toUpperCase() + username.slice(1);
        setDisplayName(formattedDisplayName);
        setTimeout(() => {
          setShowToast(false);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        toast.error("Invalid credentials");
        console.log("catchinh", err);
        throw new Error(err);
      });
  };

  const handleLogOut = () => {
    setIsLoggedIn((prevLoggedIn) => !prevLoggedIn);
    setToken("");
    setShowToast(true);
    setDisplayName("");
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
    sessionStorage.removeItem("authToken");
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <DashboardLayout
            showToast={showToast}
            isLoggedIn={isLoggedIn}
            displayName={displayName}
            handleLogOut={handleLogOut}
            message={`Logged in successful!`}
          />
          // token ? (
          //   <DashboardLayout
          //     showToast={showToast}
          //     isLoggedIn={isLoggedIn}
          //     displayName={displayName}
          //     handleLogOut={handleLogOut}
          //     message={`Logged in successful!`}
          //   />
          // ) : (
          //   <LoginLayout
          //     handleSubmit={handleSubmit}
          //     showToast={showToast}
          //     message="Logged out successful."
          //     loading={loading}
          //   />
          // )
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/weaponshop" element={<WeaponShopPage />} />
        <Route
          path="/edit/weapon/:id"
          element={<EditPage />}
          loader={weaponLoader}
        />
        <Route path="/itemshop" element={<ItemShopPage />} />
        <Route
          path="/edit/item/:id"
          element={<EditPage />}
          loader={itemLoader}
        />
        <Route path="/create/weapon" element={<CreateWeaponPage />} />
        <Route path="/payout" element={<CreatePayoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
