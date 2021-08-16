import api from "./api";

const getAll = () => {
  return api.get("/recipes/getallbyuser");
};

const getCommentsByRecipe = (recipeId) => {
  return api.post(`/comments/getbyrecipe`,{
    recipeId: recipeId,
  });
};

const create = (data) => {
  return api.post("/comments/create", data);
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

const findByTitle = (title) => {
  return api.get(`/tutorials?title=${title}`);
};

const CommentService = {
  getAll,
  getCommentsByRecipe,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default CommentService;
