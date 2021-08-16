import React, { useState } from "react";
import CommentDataService from "../../services/comment.service";

const AddComment = (props) => {
  const initialCommentState = {
    commentText: ""
  };
  const [comment, setComment] = useState(initialCommentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const saveComment = () => {
    var data = {
      commentText: comment.commentText,
      recipeId: props.selectedId
    };
    CommentDataService.create(data)
      .then(response => {
        setComment({
          id: response.data.id,
          date: response.data.date,
          commentText: response.data.comment,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newComment = () => {
    setComment(initialCommentState);
    setSubmitted(false);
    props.refreshList();
  };

  return (
    <div className="submit-form mt-5">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-outline-success mt-2" onClick={newComment}>
            Add more..
          </button>
        </div>
      ) : (
        <div container>
          <h4>Add a new Comment!</h4>
          <div className="form-group">
            <label htmlFor="commentText">Comment</label>
            <input
              type="text"
              className="form-control"
              id="commentText"
              required
              value={comment.commentText}
              onChange={handleInputChange}
              name="commentText"
            />
          </div>

          <button onClick={saveComment} className="btn btn-outline-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddComment;
  