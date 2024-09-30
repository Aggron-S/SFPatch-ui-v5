import { Link } from "react-router-dom";
import image from "../assets/images/PSU_1600x900_1.webp";

const HomePage = () => {
  return (
    <div className="bg-primary-bg-500 flex items-center justify-center overflow-hidden">
      <img className="w-full opacity-10 object-contain" src={image} alt="" />
      <div className="z-10 absolute">
        <div className="flex flex-col items-center justify-center max-w-3xl">
          <h1 className="text-text-100 text-4xl">
            Welcome to <span className="text-primary-purple-500">Rival SF</span>{" "}
            Patch Tool
          </h1>
          <p className="text-text-100 text-lg text-center">
            This tool is designed to help speed up patches for the Rival SF
            community. If you have any questions on how this tool operates
            please reach out to one of the developers<br></br>{" "}
            <span className="text-primary-purple-500">
              (Stack, Prodigy, Bryan, Revenge)
            </span>
          </p>
          <Link
            to="/weaponshop"
            className="flex items-center justify-center text-text-100 bg-primary-purple-500 p-3 rounded-md px-8 hover:bg-secondary-blue-500 mt-6"
          >
            Weapon Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
