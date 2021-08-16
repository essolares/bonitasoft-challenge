import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="card card-container">
      <header className="container-fluid d-flex flex-row ">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <h3 className="mx-5">
          <strong>{`     ${currentUser.username}`}</strong>
        </h3>
      </header>
      <br/>
      <p className="text-left">
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p className="text-left">
        <strong>Name:</strong> {currentUser.name}
      </p>
      <p className="text-left">
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p className="text-left">
        <strong>Phone:</strong> {currentUser.phone}
      </p>
      <strong className="text-left">Authorities:</strong>
      <ul className="text-left">
        {currentUser.roles &&
          currentUser.roles.map((role,idx) => <li key={idx}>{role["name"]}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
