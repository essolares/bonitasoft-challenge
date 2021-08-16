import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Back from "../assets/background3.jpg"

const Home = () => {
  const [content, setContent] = useState("");

  /*useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);*/
  const style ={

  }
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
