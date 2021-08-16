import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import logo from "../../assets/Bonitasoft_Logo.png"
import "bootstrap-icons/font/bootstrap-icons.css";

import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";


const Header = () => {
    const [showUserBoard, setShowUserBoard] = useState(false);
    const [showChefBoard, setShowChefBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
        setShowUserBoard(user.roles.some( role => role['name'] === 'USER' ));
        setShowChefBoard(user.roles.some( role => role['name'] === 'CHEF' ));
        setShowAdminBoard(user.roles.some( role => role['name'] === 'ADMIN' ));
      }
  
      EventBus.on("logout", () => {
        logOut();
      });
  
      return () => {
        EventBus.remove("logout");
      };
    }, []);
  
    const logOut = () => {
      AuthService.logout();
      setShowUserBoard(false);
      setShowChefBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(undefined);
    };

    return (
        <nav className="navbar navbar-expand bg-black bg-gradient h-20vh">
        <Link to={"/"} className="navbar-brand text-white px-4">
          <img src={logo} width="150"alt=""loading="lazy" className=""/>
        </Link>
        <div className="navbar-nav m-auto">
          {currentUser && (
          <li className="nav-item">
            <Link to={"/home"} className="nav-link text-white mt-3 mx-3 h5">
              Home
            </Link>
          </li>
          )}

          {showUserBoard && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link text-info mt-3 mx-3 h5">
                User Board
              </Link>
            </li>
          )}

          {showChefBoard && (
            <li className="nav-item">
              <Link to={"/chef"} className="nav-link text-info mt-3 mx-3 h5">
                Chef Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link text-info mt-3 mx-3 h5">
                Admin Board
              </Link>
            </li>
          )}

          {/*currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )*/}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link text-primary mt-3 mx-3 h5">
                <button className="btn btn-outline-info navbar-btn ">
                <i className="bi bi-person-circle"></i></button>
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link text-blue mt-3 mx-3 h5" onClick={logOut}>
              <button className="btn btn-outline-danger navbar-btn ">
              <i className="bi bi-box-arrow-right"></i>      LogOut</button>
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link text-light mt-3 mx-3 h5">
              <button className="btn btn-outline-danger navbar-btn ">
              <i className="bi bi-person-circle"></i>   LOGIN</button>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link text-white mt-3 mx-3 h5">
              <button className="btn btn-outline-info navbar-btn">
              <i className="bi bi-pencil-square"></i>     SIGN UP</button>
              </Link>
            </li>
          </div>
        )}
      </nav>
    )
}

export default Header
