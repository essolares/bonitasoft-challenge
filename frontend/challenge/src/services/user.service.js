import api from "./api";

const getAll = () => {
  return api.get("/users/getall");
};

const remove = (userId) => {
  return api.delete("/users/deleteuser",{data:{
    userId: userId,
  }});
};

const UserService = {
  getAll,
  remove
};

export default UserService;
