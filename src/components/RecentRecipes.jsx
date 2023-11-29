import React from "react";
import { useState, useEffect } from "react";
const RecentRecipes = () => {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
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
  }, []);

  return <div>RecentRecipes</div>;
};

export default RecentRecipes;
