import React, { useState, useEffect } from "react";
import RecipesList from "./Recipe/RecipeList.js"

const BoardUser = () => {
  const [content, setContent] = useState("");
  return (
    <div className="container">
      <div className="table-card table-container">
        <RecipesList />
      </div>
    </div>
  );
};

export default BoardUser;
