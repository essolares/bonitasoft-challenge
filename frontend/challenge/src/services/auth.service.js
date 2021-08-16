import api from "./api";
import TokenService from "./token.service";

const register = (username, email, password,name,phone) => {
  return api.post("/users/register", {
    username,
    email,
    password,
    name,
    phone,
    role: "USER"
  });
};

const login = (username, password) => {
  return api
    .post("/users/authenticate", {
      username,
      password
    })
    .then((response) => {
      if (response.data.token) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
