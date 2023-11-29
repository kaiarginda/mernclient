// // import React, { useState, useEffect } from "react";
// // import IndividualRecipe from "./IndividualRecipe";
// // import { ProgressBar } from "react-loader-spinner";
// // import { FaRegHeart, FaHeart } from "react-icons/fa";
// // import { useCookies } from "react-cookie";

// // const RecipeList = () => {
// //   const [recipe, setRecipe] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [displayedRecipes, setDisplayedRecipes] = useState(6);
// //   const [loading, setLoading] = useState(false);
// //   const [wishlist, setWishlist] = useState([]);
// //   const [loggedUser, setLoggedUser] = useState(null);
// //   const [cookies, setCookie] = useCookies(["name"]);
// //   const [cirr, setCirr] = useState("");
// //   // console.log(wishlist);

// //   useEffect(() => {
// //     async function fetchData() {
// //       setLoading(true);
// //       try {
// //         const response = await fetch("http://localhost:5000/api/recipes", {
// //           method: "GET",
// //         });
// //         if (response.ok) {
// //           const data = await response.json();
// //           setRecipe(data);
// //         } else {
// //           console.log("Request failed with status:", response.status);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //       setLoading(false);
// //     }
// //     fetchData();

// //     const getFavourites = async () => {
// //       try {
// //         const response = await fetch(
// //           "http://localhost:5000/api/get-favourites",
// //           {
// //             method: "POST",
// //             headers: {
// //               "Content-type": "application/json",
// //             },
// //             body: JSON.stringify({ token: cookies?.token }),
// //           }
// //         );
// //         if (response.ok) {
// //           const data = await response.json();
// //           console.log(data, "datunia");
// //           setLoggedUser(data.loggedUser);
// //           setWishlist(data.favourites);
// //           // console.log(data.user.favourites, "favourites frfrfrfr");
// //         } else {
// //           // console.log("Request failed with status:", response.status);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
// //     getFavourites();

// //     // update-favourites
// //   }, []);
// //   const loadMore = () => {
// //     setDisplayedRecipes(displayedRecipes + 3);
// //   };
// //   console.log(loggedUser, "logged user currently");
// //   const filteredRecipes = recipe.filter(
// //     (item) => !search || item.title.includes(search)
// //   );

// //   // const addToFavourites = async (i) => {
// //   //   const recipeId = filteredRecipes[i]._id;

// //   //   if (wishlist.includes(recipeId)) {
// //   //     const newWishlist = wishlist.slice(); // Create a shallow copy of the array
// //   //     newWishlist.splice(newWishlist.indexOf(recipeId), 1);
// //   //     setWishlist(newWishlist);
// //   //   } else {
// //   //     setWishlist([...wishlist, recipeId]);
// //   //   }
// //   //   console.log(wishlist, recipeId, "i love yu fr from the second");

// //   //   // console.log(loggedUser, wishlist, "fdsgfdgdsgasgbcvxbcv");
// //   //   const updateFavourites = async () => {
// //   //     try {
// //   //       await fetch("http://localhost:5000/api/update-favourites", {
// //   //         method: "POST",
// //   //         body: JSON.stringify({ user: loggedUser, favourites: wishlist }),
// //   //         headers: {
// //   //           "Content-type": "application/json",
// //   //         },
// //   //       });
// //   //     } catch (error) {
// //   //       console.error("Error fetching data:", error);
// //   //     }
// //   //   };
// //   //   updateFavourites();
// //   // };

// //   const addToFavourites = async (i) => {
// //     const recipeId = filteredRecipes[i]._id;

// //     // Create a copy of the current wishlist state
// //     const updatedWishlist = [...wishlist];

// //     if (updatedWishlist.includes(recipeId)) {
// //       // Recipe is already in the wishlist, remove it
// //       const index = updatedWishlist.indexOf(recipeId);
// //       updatedWishlist.splice(index, 1);
// //     } else {
// //       // Recipe is not in the wishlist, add it
// //       updatedWishlist.push(recipeId);
// //     }

// //     // Update the wishlist state
// //     setWishlist(updatedWishlist);

// //     // Log the updated wishlist

// //     // Update the server with the new wishlist
// //     const updateFavourites = async () => {
// //       try {
// //         await fetch("http://localhost:5000/api/update-favourites", {
// //           method: "POST",
// //           body: JSON.stringify({
// //             user: loggedUser,
// //             favourites: updatedWishlist,
// //           }),
// //           headers: {
// //             "Content-type": "application/json",
// //           },
// //         });
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //     updateFavourites();
// //   };

// //   // console.log(loggedUser, "loggedfr");

// //   return (
// //     <div className="flex flex-col items-center justify-center p-10">
// //       <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-10">
// //         <form className="flex items-center">
// //           <input
// //             onChange={(e) => setSearch(e.target.value)}
// //             type="text"
// //             placeholder="Search for recipes..."
// //             className="w-full py-2 px-3 bg-gray-800 text-white rounded-l focus:outline-none"
// //           />
// //         </form>
// //       </div>

// //       <div className="recipe-grid grid grid-cols-3 gap-10">
// //         {filteredRecipes.slice(0, displayedRecipes).map((item, index) => {
// //           return (
// //             <div key={index} className="relative">
// //               <IndividualRecipe
// //                 title={item.title}
// //                 ingredients={item.ingredients}
// //                 description={item.description}
// //                 image={`http://localhost:5000/uploads/${item.image}`}
// //                 recipe={item}
// //               />

// //               {loggedUser ? (
// //                 <button
// //                   onClick={() => {
// //                     addToFavourites(index);
// //                   }}
// //                   className="absolute top-2 right-2 flex items-center justify-center bg-white rounded-full p-2"
// //                 >
// //                   {wishlist.includes(filteredRecipes[index]._id) ? (
// //                     <FaHeart fill="red" />
// //                   ) : (
// //                     <FaRegHeart />
// //                   )}
// //                   {/* {isRecipeInWishlist(item.id) ? (
// //                   <FaHeart fill="red" />
// //                 ) : (
// //                   <FaRegHeart />
// //                 )} */}
// //                 </button>
// //               ) : null}
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {loading ? (
// //         <ProgressBar
// //           height="80"
// //           width="80"
// //           ariaLabel="progress-bar-loading"
// //           wrapperStyle={{}}
// //           wrapperClass="progress-bar-wrapper"
// //           borderColor="#F4442E"
// //           barColor="#51E5FF"
// //         />
// //       ) : null}

// //       {filteredRecipes.length > displayedRecipes && (
// //         <button
// //           onClick={loadMore}
// //           className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none mt-5"
// //         >
// //           Load More
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default RecipeList;

// import React, { useState, useEffect } from "react";
// import IndividualRecipe from "./IndividualRecipe";
// import { ProgressBar } from "react-loader-spinner";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { useCookies } from "react-cookie";

// const RecipeList = () => {
//   const [recipe, setRecipe] = useState([]);
//   const [search, setSearch] = useState("");
//   const [displayedRecipes, setDisplayedRecipes] = useState(6);
//   const [loading, setLoading] = useState(false);
//   const [wishlist, setWishlist] = useState([]);
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [cookies, setCookie] = useCookies(["name"]);
//   const [cirr, setCirr] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const response = await fetch("http://localhost:5000/api/recipes", {
//           method: "GET",
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setRecipe(data);
//         } else {
//           console.log("Request failed with status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//       setLoading(false);
//     }
//     fetchData();

//     const getFavourites = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/get-favourites",
//           {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json",
//             },
//             body: JSON.stringify({ token: cookies?.token }),
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data, "datunia");
//           setLoggedUser(data.loggedUser);
//           setWishlist(data.favourites);
//         } else {
//           console.log("Request failed with status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getFavourites();
//   }, []);

//   const loadMore = () => {
//     setDisplayedRecipes(displayedRecipes + 4);
//   };

//   const addToFavourites = async (i) => {
//     const recipeId = recipe[i]._id;
//     const updatedWishlist = [...wishlist];

//     if (updatedWishlist.includes(recipeId)) {
//       const index = updatedWishlist.indexOf(recipeId);
//       updatedWishlist.splice(index, 1);
//     } else {
//       updatedWishlist.push(recipeId);
//     }

//     setWishlist(updatedWishlist);

//     const updateFavourites = async () => {
//       try {
//         await fetch("http://localhost:5000/api/update-favourites", {
//           method: "POST",
//           body: JSON.stringify({
//             user: loggedUser,
//             favourites: updatedWishlist,
//           }),
//           headers: {
//             "Content-type": "application/json",
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     updateFavourites();
//   };

//   const filteredRecipes = recipe.filter(
//     (item) => !search || item.title.includes(search)
//   );

//   return (
//     <div className="flex flex-col items-center justify-center p-10">
//       <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-10 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
//         <form className="flex items-center">
//           <input
//             onChange={(e) => setSearch(e.target.value)}
//             type="text"
//             placeholder="Search for recipes..."
//             className="w-full py-2 px-3 bg-gray-800 text-white rounded-l focus:outline-none"
//           />
//         </form>
//       </div>

//       <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {filteredRecipes.slice(0, displayedRecipes).map((item, index) => (
//           <div key={index} className="relative">
//             <IndividualRecipe
//               title={item.title}
//               ingredients={item.ingredients}
//               description={item.description}
//               image={`http://localhost:5000/uploads/${item.image}`}
//               recipe={item}
//             />

//             {loggedUser && (
//               <button
//                 onClick={() => addToFavourites(index)}
//                 className="absolute top-2 right-2 flex items-center justify-center bg-white rounded-full p-2"
//               >
//                 {wishlist.includes(recipe[index]._id) ? (
//                   <FaHeart fill="red" />
//                 ) : (
//                   <FaRegHeart />
//                 )}
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {loading && (
//         <ProgressBar
//           height="80"
//           width="80"
//           ariaLabel="progress-bar-loading"
//           wrapperStyle={{}}
//           wrapperClass="progress-bar-wrapper"
//           borderColor="#F4442E"
//           barColor="#51E5FF"
//         />
//       )}

//       {filteredRecipes.length > displayedRecipes && (
//         <button
//           onClick={loadMore}
//           className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none mt-5"
//         >
//           Load More
//         </button>
//       )}
//     </div>
//   );
// };

// export default RecipeList;

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
        const response = await fetch("http://localhost:5000/api/recipes", {
          method: "GET",
        });
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
          "http://localhost:5000/api/get-favourites",
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
        await fetch("http://localhost:5000/api/update-favourites", {
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
    (item) => !search || item.title.includes(search)
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
              image={`http://localhost:5000/uploads/${item.image}`}
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
