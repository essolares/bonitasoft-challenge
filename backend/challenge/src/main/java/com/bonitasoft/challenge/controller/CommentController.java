package com.bonitasoft.challenge.controller;

import com.bonitasoft.challenge.dto.CommentDto;
import com.bonitasoft.challenge.model.Comment;
import com.bonitasoft.challenge.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
/**
 * REST API FOR COMMENTS, allow receiving POST and GET request to interact with the database tables.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;
    /**
     * create -
     * Create recipe, to create new comment,
     * POST request.
     * USER role required.
     */
    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value="/create", method = RequestMethod.POST)
    public Comment saveRecipe(@RequestBody CommentDto comment){
        return commentService.save(comment);
    }

    /**
     * getall -
     * Create recipe, to get all comments
     * GET request.
     * ADMIN role required.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/getall", method = RequestMethod.GET)
    public List<Comment> getAll(){
        return commentService.findAll();
    }

    /**
     * getallbyuser -
     * Create recipe, to get all comments
     * GET request.
     * USER role required.
     */
    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value="/getallbyuser", method = RequestMethod.GET)
    public List<Comment> findAllByUser(){
        return commentService.findAllByUser();
    }

    /**
     * getbyrecipe -
     * Create recipe, to get all comments by recipe
     * POST request.
     * ADMIN, USER, CHEF role required.
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'USER', 'CHEF')")
    @RequestMapping(value="/getbyrecipe", method = RequestMethod.POST)
    public List<Comment> findByRecipeId(@RequestBody Map<String, Long> recipeId){
        return commentService.findByRecipeId(recipeId.get("recipeId"));
    }
}
