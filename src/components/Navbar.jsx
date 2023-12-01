import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["name"]);
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    const fetchDat = async () => {
      try {
        const response = await fetch(
          "https://mernback-2g3e.onrender.com/api/loggedUser",
          {
            method: "POST",
            headers: {
              // Authorization: `Bearer ${cookies.token}`,
              "Content-type": "application/json",
            },
            credentials: "include",
            xhrFields: {
              withCredentials: true,
            },
            body: JSON.stringify({ token: cookies.token }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data, "data");
          setLoggedUser(data.user);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error(error.message, "from fetch");
      }
    };

    fetchDat();
  }, [cookies]);

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 to="/" className="text-2xl font-bold text-white">
          Recipes
        </h1>
        <ul className="flex space-x-6">
          {loggedUser.name ? (
            <div>
              {" "}
              <li>
                <Link
                  to="/create-recipe"
                  className="text-white hover:text-gray-300"
                >
                  Create-Recipe
                </Link>
              </li>
            </div>
          ) : null}
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
          {/* <li>
            <Link to="/services" className="text-white hover:text-gray-300">
              Services
            </Link>
          </li> */}
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
