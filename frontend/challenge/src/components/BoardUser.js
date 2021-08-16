import React from "react";
import RecipesList from "./Recipe/RecipeList.js"

const BoardUser = () => {
  return (
    <div className="container">
      <div className="table-card table-container">
        <RecipesList />
      </div>
    </div>
  );
};

export default BoardUser;
