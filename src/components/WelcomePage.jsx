

import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 text-center">
        Welcome to Our Recipe Website
      </h1>
      <p className="text-lg md:text-xl text-white mb-8 text-center">
        Discover and share delicious recipes from around the world.
      </p>
      <Link
        to="/home"
        href="/explore-recipes"
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full text-lg transition duration-300 ease-in-out hover:scale-105"
      >
        Explore Recipes
      </Link>
      <div className="flex flex-col md:flex-row mt-4">
        <Link
          to={"/register"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 md:mr-2"
        >
          Register
        </Link>
        <Link
          to={"/login"}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:ml-2"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
