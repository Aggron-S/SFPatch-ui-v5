import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import LogInPage from "../pages/LogInPage";
import Spinner from "../components/Spinner";


const LoginLayout = ({ handleSubmit, showToast, message, loading }) => {
  return (
    <>
      <div className="h-screen overflow-hidden bg-primary-bg-500 grid grid-rows-20/80">
        <Navbar showToast={showToast} message={message} />
        <div className="flex w-screen items-center justify-center h-full pb-32">
          {loading ? <Spinner loading={loading} /> : <LogInPage handleSubmit={handleSubmit} />}
          
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginLayout;
