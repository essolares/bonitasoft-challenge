package com.bonitasoft.challenge.dto;
import com.bonitasoft.challenge.model.Comment;
import java.util.Date;
/**
 * DTO for Comment response, to get data from database
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public class CommentDto {

    private String commentText;

    private Long recipeId;

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public Comment getCommentFromDto(){
            Comment comment = new Comment();
            comment.setComment(commentText);
            comment.setDate(new Date());
            return comment;
        }

}
