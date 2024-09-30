import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-full bg-primary-bg-500">
      <FaExclamationTriangle className="text-secondary-cyan-500 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4 text-text-100 ">404 Not Found</h1>
      <p className="text-xl mb-5 text-text-100 ">This page does not exist</p>
      <Link
        to="/"
        className="text-secondary-cyan-500 hover:text-secondary-blue-500 text-lg rounded-md px-3 py-2 mt-4 underline"
      >
        Dashboard
      </Link>
    </section>
  );
};

export default NotFoundPage;
