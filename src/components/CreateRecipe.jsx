import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Cookies } from "react-cookie";
import Model from "./Model";
import { Oval } from "react-loader-spinner";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    ingredients: [""],
    description: "",
  });

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const [cookies, setCookie] = useCookies(["name"]);
  const [loggedUser, setLoggedUser] = useState("");
  const [allImages, setAllImages] = useState("");

  useEffect(() => {
    setLoading(false);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/loggedUser",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ token: cookies.token }),
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setLoggedUser(userData.user);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [cookies]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!loggedUser.name) {
      alert("Log In to create the recipe");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("image", image);
    data.append("ingredients", ingredients);

    try {
      await fetch("http://localhost:5000/api/createRecipe", {
        method: "POST",
        body: data,
      });

      // The API call is complete, set loading to false
      setLoading(false);
    } catch (error) {
      console.error("Error creating recipe:", error);
      // Handle error if needed
      setLoading(false);
    }
    setIngredients([]);
    setImage("");
    setName("");
    setDescription("");
  };

  useEffect(() => {
    return () => {
      // This cleanup function will run when the component unmounts
      setLoading(false);
    };
  }, []); // Empty dependency array ensures the cleanup runs only once, when the component unmounts

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const [isProfileVisible, setProfileVisible] = useState(false);

  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
  };

  return (
    <div className="min-h-screen  items-center justify-center bg-gray-100 flex flex-col p-5">
      {/* ... (Profile toggle code) */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Recipe
        </h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-600">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-600">
              Ingredients
            </label>
            {ingredients?.map((ingredient, index) => (
              <div key={index} className="mb-2 relative">
                <input
                  type="text"
                  name={`ingredient-${index}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
            >
              Add Ingredient
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
            >
              Create Recipe
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center pt-5">
          {loading ? (
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
