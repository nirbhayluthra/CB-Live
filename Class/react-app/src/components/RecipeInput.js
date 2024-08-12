import React, { useState } from "react";

const RecipeInput = ({ onQueryChange }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onQueryChange(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="recepe-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for a recipe"
      />
    </form>
  );
};

export default RecipeInput;
