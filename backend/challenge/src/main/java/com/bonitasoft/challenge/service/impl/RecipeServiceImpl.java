package com.bonitasoft.challenge.service.impl;

import com.bonitasoft.challenge.dao.RecipeDao;
import com.bonitasoft.challenge.dto.RecipeDto;
import com.bonitasoft.challenge.model.Recipe;
import com.bonitasoft.challenge.model.User;
import com.bonitasoft.challenge.service.RecipeService;
import com.bonitasoft.challenge.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Recipe Service interface implementation to get database data.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Service(value = "recipeService")
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    private RecipeDao recipeDao;

    @Autowired
    private UserService userService;

    @Override
    public Recipe save(RecipeDto recipe) {
        Recipe nRecipe = recipe.getRecipeFromDto();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        User user = userService.findOne(username);
        nRecipe.setUser(user);
        return recipeDao.save(nRecipe);
    }

    /**Get all the recipes from admin*/
    public List<Recipe> findAll() {
        List<Recipe> list = new ArrayList<>();
        recipeDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public Recipe findOne(String name) {
        return recipeDao.findRecipeByName(name);
    }

    @Override
    public Optional<Recipe> findById(Long id) {
        return recipeDao.findById(id);
    }

    /**Get all Recipes by authenticated user*/
    public List<Recipe> findAllByUser() {
        List<Recipe> list = new ArrayList<>();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        User user = userService.findOne(username);
        return recipeDao.findAllByUserId(user.getId());
    }

    public List<Recipe> findAllByUserId(Long userId) {
        List<Recipe> list = new ArrayList<>();
        return recipeDao.findAllByUserId(userId);
    }
    public List<Recipe> findRecipesByIngredients(String ingredient) {
        List<Recipe> list = new ArrayList<>();
        return recipeDao.findByIngredientsIgnoreCaseContaining(ingredient);
    }
}
