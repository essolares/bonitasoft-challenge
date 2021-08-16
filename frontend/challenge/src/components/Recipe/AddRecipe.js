import React, { useState } from "react";
import RecipeDataService from "../../services/recipe.service";

const AddRecipe = (props) => {
  const initialRecipeState = {
    id: null,
    name: "",
    ingredients: ""
  };
  const [recipe, setRecipe] = useState(initialRecipeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const saveRecipe = () => {
    var data = {
      name: recipe.name,
      ingredients: recipe.ingredients
    };

    RecipeDataService.create(data)
      .then(response => {
        setRecipe({
          id: response.data.id,
          name: response.data.name,
          ingredients: response.data.ingredients
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newRecipe = () => {
    setRecipe(initialRecipeState);
    setSubmitted(false);
    props.refreshList();
  };

  return (
    <div className="submit-form mt-5">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-outline-success mt-2" onClick={newRecipe}>
            Add more..
          </button>
        </div>
      ) : (
        <div container>
          <h4>Add a new Recipe!</h4>
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={recipe.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              className="form-control"
              id="ingredients"
              required
              value={recipe.ingredients}
              onChange={handleInputChange}
              name="ingredients"
            />
          </div>

          <button onClick={saveRecipe} className="btn btn-outline-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
  