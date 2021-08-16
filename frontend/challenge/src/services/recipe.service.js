import api from "./api";

const getAll = () => {
  return api.get("/recipes/getall");
};

const getAllByUser = () => {
  return api.get("/recipes/getallbyuser");
};

const create = (data) => {
  return api.post("/recipes/create", data);
};

const findByIngredient = (ingredient) => {
  return api.post("/recipes/getrecipesbyingredient",{
    ingredient: ingredient,
  });
};

const RecipeService = {
  getAll,
  getAllByUser,
  create,
  findByIngredient,
};

export default RecipeService;
