import React from "react";
import { Link } from "react-router-dom";

const truncateDescription = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const IndividualRecipe = ({
  image,
  title,
  description,
  ingredients,
  recipe,
}) => {
  const truncatedDescription = truncateDescription(description, 100); // Adjust the length as needed

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-full flex flex-col">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="px-6 py-4 flex flex-col flex-grow">
        <div className="font-bold text-xl mb-2">
          <Link
            to={`/recipes/${title}/${recipe._id}`}
            className="hover:underline"
          >
            {title}{" "}
          </Link>
        </div>
        {/* <p className="text-gray-700 text-base truncate pr-4">
          {truncatedDescription}
        </p> */}
      </div>
      {/* <div className="px-6 py-4">
        <p className="text-gray-700 font-semibold mb-2">Ingredients:</p>
        <ul className="list-disc pl-4">
          {ingredients.slice(0, 3).map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient}
            </li>
          ))}
          {ingredients.length > 3 && <li className="text-gray-600">...</li>}
        </ul>
      </div> */}
      {/* <div className="mt-auto px-6 py-4">
        <Link
          to={`/recipes/${title}/${recipe._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Read More
        </Link>
      </div> */}
    </div>
  );
};

export default IndividualRecipe;
