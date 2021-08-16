package com.bonitasoft.challenge.dao;

import com.bonitasoft.challenge.model.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for recipes, to get data from database
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Repository
public interface RecipeDao extends CrudRepository<Recipe, Long> {
    Recipe findRecipeByName(String name);
    List<Recipe> findAllByUserId(Long userId);
    List<Recipe> findByIngredientsIgnoreCaseContaining(String ingredient);
}