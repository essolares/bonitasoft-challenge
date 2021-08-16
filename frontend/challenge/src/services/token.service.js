const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
};

const getLocalToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

const updateLocalToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.token = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
  console.log(JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalToken,
  updateLocalToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
