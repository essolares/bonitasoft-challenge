package com.bonitasoft.challenge.dao;

import com.bonitasoft.challenge.model.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * Repository for Comments, to get data from database
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@Repository
public interface CommentDao extends CrudRepository<Comment, Long> {
    List<Comment> findAllByUserId(Long userId);
    List<Comment> findByRecipeId(Long recipeId);
}