import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardChef from "./components/BoardChef";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const style={
    height: "90vh"
  }
  return (
    <div className="d-flex w-100 h-100 flex-column text-center ">
      <Header/>
      <div style={style}>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/chef" component={BoardChef} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
