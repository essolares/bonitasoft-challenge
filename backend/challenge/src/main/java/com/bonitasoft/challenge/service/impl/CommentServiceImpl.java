package com.bonitasoft.challenge.service.impl;

import com.bonitasoft.challenge.dao.CommentDao;
import com.bonitasoft.challenge.dto.CommentDto;
import com.bonitasoft.challenge.model.Comment;
import com.bonitasoft.challenge.model.Recipe;
import com.bonitasoft.challenge.model.User;
import com.bonitasoft.challenge.service.CommentService;
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
 * Comment Service interface implementation to get database data.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Service(value = "commentService")
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentDao commentDao;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @Override
    public Comment save(CommentDto comment) {
        Comment nComment  = comment.getCommentFromDto();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        User user = userService.findOne(username);
        nComment.setUser(user);

        Optional<Recipe> recipe = recipeService.findById(comment.getRecipeId());
        nComment.setRecipe(recipe.get());

        return commentDao.save(nComment);
    }

    /**Get all from admin*/
    public List<Comment> findAll() {
        List<Comment> list = new ArrayList<>();
        commentDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    /**Get all comments by authenticated user*/
    public List<Comment> findAllByUser() {
        List<Comment> list = new ArrayList<>();
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        User user = userService.findOne(username);
        return commentDao.findAllByUserId(user.getId());
    }

    public List<Comment> findByRecipeId(Long recipeId){
        System.out.println("------------------" + recipeId);
        return commentDao.findByRecipeId(recipeId);
    }
}
