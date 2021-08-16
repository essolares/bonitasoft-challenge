import api from "./api";

const getAll = () => {
  return api.get("/recipes/getall");
};

const getAllByUser = () => {
  return api.get("/recipes/getallbyuser");
};

const get = (id) => {
  return api.get(`/tutorials/${id}`);
};

const create = (data) => {
  return api.post("/recipes/create", data);
};


const update = (id, data) => {
  return api.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return api.delete(`/tutorials`);
};

const findByIngredient = (ingredient) => {
  return api.post(`/recipes/getrecipesbyingredient`,{
    ingredient: ingredient,
  });
};

const RecipeService = {
  getAll,
  getAllByUser,
  get,
  create,
  update,
  remove,
  removeAll,
  findByIngredient,
};

export default RecipeService;
