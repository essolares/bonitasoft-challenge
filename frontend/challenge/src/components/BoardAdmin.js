import React, { useState, useEffect } from "react";
import UserList from "./User/UserList";

const BoardAdmin = () => {
  return (
    <div className="container">
    <div className="table-card table-container">
      <UserList />
    </div>
    </div>
  );
};

export default BoardAdmin;
