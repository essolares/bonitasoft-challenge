package com.bonitasoft.challenge.service;

import com.bonitasoft.challenge.dto.RecipeDto;
import com.bonitasoft.challenge.model.Recipe;

import java.util.List;
import java.util.Optional;
/**
 * Recipe Service interface
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public interface RecipeService {
    Recipe save(RecipeDto recipe);
    List<Recipe> findAll();
    Recipe findOne(String name);
    Optional<Recipe> findById(Long id);
    List<Recipe> findAllByUser();
    List<Recipe> findAllByUserId(Long userId);
    List<Recipe> findRecipesByIngredients(String ingredient);
}
