package com.bonitasoft.challenge.controller;

import com.bonitasoft.challenge.dto.RecipeDto;
import com.bonitasoft.challenge.model.Recipe;
import com.bonitasoft.challenge.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
/**
 * REST API FOR RECIPES, allow receiving POST and GET request to interact with the database tables.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1//recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    /**
     * create -
     * Create recipe, to create new recipe,
     * POST request.
     * CHEF role required.
     */
    @PreAuthorize("hasRole('CHEF')")
    @RequestMapping(value="/create", method = RequestMethod.POST)
    public Recipe saveRecipe(@RequestBody RecipeDto recipe){
        return recipeService.save(recipe);
    }
    /**
     * getall -
     * Get All Recipes, all the roles can see recipes
     * GET request.
     * CHEF, ADMIN, USER role required.
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'CHEF')")
    @RequestMapping(value="/getall", method = RequestMethod.GET)
    public List<Recipe> getAll(){
        return recipeService.findAll();
    }
    /**
     * getallbyuser -
     * Get All Recipes by user, all the recipes by user in token
     * GET request.
     * CHEF role required.
     */
    @PreAuthorize("hasRole('CHEF')")
    @RequestMapping(value="/getallbyuser", method = RequestMethod.GET)
    public List<Recipe> getAllByUser(){
        return recipeService.findAllByUser();
    }

    /**
     * getbyuserid -
     * Get All Recipes by user id, all the recipes by user id
     * GET request.
     * CHEF role required.
     */
    @PreAuthorize("hasRole('CHEF')")
    @RequestMapping(value="/getbyuserid", method = RequestMethod.GET)
    public List<Recipe> getByUserId(Long userId){
        return recipeService.findAllByUserId(userId);
    }

    /**
     * getrecipesbyingredient -
     * Get All Recipes by ingredient, all the recipes by ingredient
     * POST request.
     * CHEF, USER, ADMIN role required.
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'CHEF')")
    @RequestMapping(value="/getrecipesbyingredient", method = RequestMethod.POST)
    public List<Recipe> findByRecipeId(@RequestBody Map<String, String> ingredient){
        return recipeService.findRecipesByIngredients(ingredient.get("ingredient"));
    }
}
