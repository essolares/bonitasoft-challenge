package com.bonitasoft.challenge.service;

import com.bonitasoft.challenge.dto.CommentDto;
import com.bonitasoft.challenge.model.Comment;

import java.util.List;
/**
 * Comment Service interface
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public interface CommentService {
    Comment save(CommentDto comment);
    List<Comment> findAll();
    List<Comment> findAllByUser();
    List<Comment> findByRecipeId(Long recipeId);
}
