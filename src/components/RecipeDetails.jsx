

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import CommentList from "./CommentList";
import IndividualComment from "./IndividualComment";
import CommentInput from "./CommentInput";
import { Link } from "react-router-dom";

const RecipeDetails = () => {
  const url = window.location.href;
  const [cookies, setCookie] = useCookies(["name"]);
  const [loggedUser, setLoggedUser] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [author, setAuthor] = useState({});
  const [isProfileVisible, setProfileVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mern-oqur.onrender.com/api/recipes/:title/:id",
          {
            method: "POST",
            body: JSON.stringify({ recipeId: url.split("/")[5] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // console.log(data, "from response");
        if (response.ok) {
          setRecipe(data);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const fetchDat = async () => {
      try {
        const response = await fetch("https://mern-oqur.onrender.com/api/loggedUser", {
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
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data, "data");
          setLoggedUser(data.user);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error(error.message, "from fetch");
      }
    };

    fetchDat();
  }, [cookies, url]);

  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };
  // console.log(cookies);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-5">
        <div className="flex justify-center items-center">
          {loggedUser.name ? (
            <div className="text-gray-700">
              Logged-In as <span className="font-bold">{loggedUser.name}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-grow">
        {recipe ? (
          <div
            className="bg-white p-4 rounded-lg shadow-md mx-auto max-w-3xl"
            key={Math.random() * 3241243}
          >
            {/* Recipe Details */}
            <div className="mb-4">
              <img
                src={`http://localhost:5000/uploads/${recipe?.image}`}
                alt="Recipe"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="mb-4">
              <h2 className="text-4xl font-semibold">{recipe.title}</h2>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Ingredients</h3>
              <ul className="list-disc pl-4">
                {recipe?.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Description</h3>
              <p>{recipe.description}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center items-center pt-4">
        {" "}
        <Link to="/home" className="text-xl text-slate-700 font-bold">
          Other Recipes
        </Link>
      </div>
      <div className="flex p-10 justify-center">
        {loggedUser ? (
          <CommentInput postID={url.split("/")[5]} author={loggedUser.name} />
        ) : (
          <div className="flex justify-center items-center mt-8">
            <h1 className="text-xl font-semibold text-center text-gray-700">
              <Link to="/login"> Log In To Write Comment</Link>{" "}
            </h1>
          </div>
        )}
      </div>

      <CommentList productId={url.split("/")[5]} loggedUser={loggedUser} />
    </div>
  );
};

export default RecipeDetails;
