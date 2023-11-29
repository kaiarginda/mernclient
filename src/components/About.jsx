import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-[100vh] overflow-hidden">
      <div className=" text-white p-8 ">
        <h1 className="text-4xl font-bold mb-4">About Our Recipe Website</h1>
        <p className="text-lg">
          Welcome to our delightful recipe website, where food meets passion. We
          are dedicated to sharing our love for cooking and exploring new
          culinary adventures.
        </p>
        <p className="text-lg mt-4">
          Our team of passionate chefs and food enthusiasts work tirelessly to
          bring you the best recipes from around the world. Whether you're a
          seasoned cook or a novice in the kitchen, we have something for
          everyone.
        </p>
        <p className="text-lg mt-4">
          Feel the aroma, savor the taste, and experience the joy of cooking
          with our handpicked collection of mouthwatering recipes. Join us on
          this delicious journey, and let's create some culinary magic together!
        </p>
      </div>

      <div className="flex items-center justify-center mt-8">
        <Link to="/" className="text-blue-700 hover:underline">
          Go Back To The Homepage
        </Link>
      </div>
    </div>
  );
};

export default About;
