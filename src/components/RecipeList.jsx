import React, { useState, useEffect } from "react";
import IndividualRecipe from "./IndividualRecipe";
import { ProgressBar } from "react-loader-spinner";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useCookies } from "react-cookie";

const RecipeList = () => {
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [displayedRecipes, setDisplayedRecipes] = useState(8);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [cookies, setCookie] = useCookies(["name"]);
  const [cirr, setCirr] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://mern-oqur.onrender.com/api/recipes",
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }
    fetchData();

    const getFavourites = async () => {
      try {
        const response = await fetch(
          "https://mern-oqur.onrender.com/api/get-favourites",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ token: cookies?.token }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data, "datunia");
          setLoggedUser(data.loggedUser);
          setWishlist(data.favourites);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFavourites();
  }, []);

  const loadMore = () => {
    setDisplayedRecipes(displayedRecipes + 4);
  };

  const addToFavourites = async (i) => {
    const recipeId = recipe[i]._id;
    const updatedWishlist = [...wishlist];

    if (updatedWishlist.includes(recipeId)) {
      const index = updatedWishlist.indexOf(recipeId);
      updatedWishlist.splice(index, 1);
    } else {
      updatedWishlist.push(recipeId);
    }

    setWishlist(updatedWishlist);

    const updateFavourites = async () => {
      try {
        await fetch("https://mern-oqur.onrender.com/api/update-favourites", {
          method: "POST",
          body: JSON.stringify({
            user: loggedUser,
            favourites: updatedWishlist,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    updateFavourites();
  };

  const filteredRecipes = recipe.filter(
    (item) =>
      !search ||
      item.title.includes(search.toLowerCase()) ||
      item.title.includes(search.toUpperCase())
  );

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <form className="flex items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for recipes..."
            className="w-full py-2 px-3 bg-gray-800 text-white rounded-l focus:outline-none"
          />
        </form>
      </div>

      <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredRecipes.slice(0, displayedRecipes).map((item, index) => (
          <div key={index} className="relative">
            <IndividualRecipe
              title={item.title}
              ingredients={item.ingredients}
              description={item.description}
              image={`https://recipereact.onrender.com/uploads/${item.image}`}
              recipe={item}
            />

            {loggedUser && (
              <button
                onClick={() => addToFavourites(index)}
                className="absolute top-2 right-2 flex items-center justify-center bg-white rounded-full p-2"
              >
                {wishlist.includes(recipe[index]._id) ? (
                  <FaHeart fill="red" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {loading && (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}

      {filteredRecipes.length > displayedRecipes && (
        <button
          onClick={loadMore}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none mt-5"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default RecipeList;
