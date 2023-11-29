// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useCookies } from "react-cookie";
// import CommentList from "./CommentList";
// import IndividualComment from "./IndividualComment";
// import CommentInput from "./CommentInput";
// import { Link } from "react-router-dom";
// const RecipeDetails = () => {
//   const url = window.location.href;
//   const [cookies, setCookie] = useCookies(["name"]);

//   const [loggedUser, setLoggedUser] = useState("");
//   const [recipe, setRecipe] = useState([]);
//   const [author, setAuthor] = useState({});
//   console.log(recipe, "recipe");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/recipes/:title/:id",
//           {
//             method: "POST",
//             body: JSON.stringify({ recipeId: url.split("/")[5] }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = await response.json();
//         console.log(data, "from resopnse");
//         if (response.ok) {
//           setRecipe(data);
//         } else {
//           console.log("Request failed with status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();

//     const fetchDat = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/users", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${cookies.token}`,
//           },
//           credentials: "include",
//           xhrFields: {
//             withCredentials: true,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data, "data");
//           setLoggedUser(data.loggedUser);
//         } else {
//           console.log("Request failed with status:", response.status);
//         }
//       } catch (error) {
//         console.error(error.message, "from fetch");
//       }
//     };

//     fetchDat();
//   }, [cookies, url]);

//   //
//   const [isProfileVisible, setProfileVisible] = useState(false);

//   const toggleProfile = () => {
//     setProfileVisible(!isProfileVisible);
//   };
//   console.log(loggedUser, "loggedUser");
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="p-5">
//         <div className="relative">
//           <div className="flex items-center">
//             <div
//               className="relative cursor-pointer overflow-hidden h-12 w-12"
//               onClick={toggleProfile}
//             >
//               {/* <img
//                 src="your-profile-image.jpg"
//                 alt="User Profile"
//                 className="w-full h-full object-cover"
//               /> */}
//               <div
//                 className={`${
//                   isProfileVisible ? "block" : "hidden"
//                 } absolute top-0 right-0 mt-3 w-48 bg-white rounded-lg shadow-lg z-10`}
//               >
//                 <div className="p-4">
//                   <p className="text-gray-800 font-semibold text-lg">
//                     Your Name
//                   </p>
//                   <p className="text-gray-500 text-sm">your@email.com</p>
//                   <p className="text-gray-500 text-sm">Joined: Jan 1, 2023</p>
//                   <div className="mt-4">
//                     <a
//                       href="/profile"
//                       className="text-blue-500 hover:underline"
//                     >
//                       View Profile
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <span
//               className="ml-3 text-gray-700 text-lg cursor-pointer"
//               onClick={toggleProfile}
//             >
//               {loggedUser.name ? (
//                 <div>
//                   "Currently Logged User:"
//                   <h2 className="font-bold text-4xl">{loggedUser.name} </h2>
//                 </div>
//               ) : null}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div>
//         {recipe ? (
//           <div
//             className="bg-white p-4 rounded-lg shadow-md"
//             key={Math.random() * 3241243}
//           >
//             {/* ... Your JSX code ... */}
//             <div className="mb-4">
//               <img
//                 // src="https://c8.alamy.com/comp/CY92WM/beef-steak-on-a-wooden-table-CY92WM.jpg"
//                 src={`http://localhost:5000/uploads/${recipe.image}`}
//                 alt="Recipe"
//                 className="w-full aspect-auto rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <h2 className="text-2xl font-semibold">
//                 Recipe Title : {recipe.title}
//               </h2>
//             </div>
//             <div className="mb-4">
//               <h3 className="text-xl font-semibold">Ingredients</h3>
//               <ul className="list-disc pl-4">
//                 <li>Ingredient 1</li>
//                 <li>Ingredient 2</li>
//                 <li>Ingredient 3</li>
//                 {recipe?.ingredients?.map((ingredient) => {
//                   return <li>{ingredient}</li>;
//                 })}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold">Description</h3>
//               <p>
//                 {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
//                 vel sem at metus varius congue. Vivamus nec est nec justo
//                 vehicula luctus. */}
//                 {recipe.description}
//               </p>
//             </div>
//           </div>
//         ) : null}
//       </div>
//       <div className="flex p-10 w-[100%] justify-center">
//         {loggedUser ? (
//           <CommentInput postID={url.split("/")[5]} author={loggedUser} />
//         ) : (
//           <div className="flex justify-center items-center mt-8">
//             <h1 className="text-xl font-semibold text-center text-gray-700">
//               <Link to="/login"> Log In To Write Comment</Link>{" "}
//             </h1>
//           </div>
//         )}
//       </div>
//       <CommentList productId={url.split("/")[5]} />
//     </div>
//   );
// };

// export default RecipeDetails;

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
          "http://localhost:5000/api/recipes/:title/:id",
          {
            method: "POST",
            body: JSON.stringify({ recipeId: url.split("/")[5] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data, "from response");
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
        const response = await fetch("http://localhost:5000/api/loggedUser", {
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
