package com.bonitasoft.challenge.dto;

import com.bonitasoft.challenge.model.Recipe;
/**
 * DTO for recipe response, to get data from database
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public class RecipeDto {

    private String name;

    private String ingredients;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public Recipe getRecipeFromDto(){
        Recipe recipe = new Recipe();
        recipe.setName(name);
        recipe.setIngredients(ingredients);
        return recipe;
    }

}
