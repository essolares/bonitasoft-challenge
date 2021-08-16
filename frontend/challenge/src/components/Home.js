import React from "react";
import Back from "../assets/background3.jpg"

const Home = () => {
  
  return (
    
    <div className="" >
        <img  src={Back} className="img-fluid" alt="main"/> 
        <div className="container-fluid homeTitle" >
        <h1 className="display-2">Challenge BonitaSoft</h1>
        <h2 className="h1-responsive">Welcome to your new Cooking Site</h2>
        </div>
    </div>
  );
};

export default Home;
