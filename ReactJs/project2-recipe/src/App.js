import React, { useState } from "react";
import axios from "axios";
import RecipeInput from "./components/RecipeInput";
import RecipeList from "./components/RecipeList";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecipes = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      setRecipes(response.data.meals);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleQueryChange = (searchQuery) => {
    if (searchQuery) {
      getRecipes(searchQuery);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <RecipeInput onQueryChange={handleQueryChange} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </div>
  );
};

export default App;
