import api from "./api";

const getAll = () => {
  return api.get("/users/getall");
};

const UserService = {
  getAll,
};

export default UserService;
