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
      </div>
    </div>
  );
};

export default IndividualRecipe;
