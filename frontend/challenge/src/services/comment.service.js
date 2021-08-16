import api from "./api";

const getAll = () => {
  return api.get("/recipes/getallbyuser");
};

const getCommentsByRecipe = (recipeId) => {
  return api.post("/comments/getbyrecipe",{
    recipeId: recipeId,
  });
};

const create = (data) => {
  return api.post("/comments/create", data);
};

const CommentService = {
  getAll,
  getCommentsByRecipe,
  create,
};

export default CommentService;
