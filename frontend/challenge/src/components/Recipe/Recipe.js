import React, { useState, useEffect } from "react";
import RecipeDataService from "../../services/recipe.service";

const Recipe = props => {
  const initialRecipeState = {
    id: null,
    name: "",
    ingredients: ""
  };
  const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
  const [message, setMessage] = useState("");

  const getRecipe = id => {
    RecipeDataService.get(id)
      .then(response => {
        setCurrentRecipe(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRecipe(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentRecipe({ ...currentRecipe, [name]: value });
  };

  const updateRecipes= () => {
    RecipeDataService.update(currentRecipe.id, currentRecipe)
      .then(response => {
        console.log(response.data);
        setMessage("The recipe was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteRecipe = () => {
    RecipeDataService.remove(currentRecipe.id)
      .then(response => {
        console.log(response.data);
        //props.history.push("/recipes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentRecipe ? (
        <div className="edit-form">
          <h4>Recipe</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentRecipe.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Ingredients</label>
              <input
                type="text"
                className="form-control"
                id="ingredients"
                name="ingredients"
                value={currentRecipe.ingredients}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteRecipe}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateRecipes}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Recipe...</p>
        </div>
      )}
    </div>
  );
};

export default Recipe;