import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import RecipesList from "./Recipe/RecipeList";

const BoardChef = () => {

  return (
    <div className="container">
    <div className="table-card table-container">
        <RecipesList />
    </div>
    </div>
  );
};

export default BoardChef;
