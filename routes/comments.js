import express from 'express'
const router = express.Router();

import comments from '../data/comments.js';
import error from '../utilities/error.js';

router
  .route("/")
  .get((req, res) => {
    
    // GET /api/comments. Returns all comments, based on lab the array is empty
    const userId = req.query.userId;
    const postId = req.query.postId;

    // All comments.
    let filteredComments = comments;

    // If userId exists in the URL, keep only comments from that user.
    if (userId) {
      filteredComments = filteredComments.filter(
        (comment) => comment.userId === Number(userId)
      );
    }

    // If postId exists in the URL, keep only comments from that post.
    if (postId) {
      filteredComments = filteredComments.filter(
        (comment) => comment.postId === Number(postId)
      );
    }

    res.json({
      comments: filteredComments,
    });
  })
  
  .post((req, res, next) => {
    // POST /api/comments, helps to create a comment - user input: userId, postId, and body.

    if (req.body.userId && req.body.postId && req.body.body) {
      const comment = {
        // If comments is empty, start the first id at 1.
        // If comments already has data, add 1 to the last comment id.
        id: comments.length ? comments[comments.length - 1].id + 1 : 1,
        userId: Number(req.body.userId),
        postId: Number(req.body.postId),
        body: req.body.body,
      };

      comments.push(comment);

      // Send back the new comment so we can confirm it was created.
      res.status(201).json(comment);
    } else {
      next(error(400, "Insufficient Data"));
    }
  });

  router
  .route("/:id")
  .get((req, res, next) => {

    // GET /api/comments/:id, get comments by ids
    const commentId = Number(req.params.id);

    // Find the comment where the id matches the id from the URL.
    const comment = comments.find((comment) => comment.id === commentId);

    // If the comment exists, send it back.
    if (comment) {
      res.json({
        comment,
      });
    } else {
      // If the comment does not exist, send a 404 error.
      next(error(404, "Comment Not Found"));
    }
  })

  .patch((req, res, next) => {
    
    // PATCH /api/comments/:id, updates the body of one specific comment
    const commentId = Number(req.params.id);

    // Find the index of the comment we want to update.
    const commentIndex = comments.findIndex((comment) => comment.id === commentId);

    // If findIndex returns -1, that means the comment was not found
    if (commentIndex === -1) {
      return next(error(404, "Comment Not Found"));
    }

    // Return an error if the body is not provided for the update
    if (!req.body.body) {
      return next(error(400, "Comment body is required"));
    }

    // Update only the body of the comment.
    comments[commentIndex].body = req.body.body;

    // Send back the updated comment so we can confirm the change.
    res.json(comments[commentIndex]);
  
})

  .delete((req, res, next) => {
    
    // DELETE /api/comments/:id, deletes comment by its id.
    const commentId = Number(req.params.id);

    // Find the index of the comment we want to delete.
    const commentIndex = comments.findIndex((comment) => comment.id === commentId);

    // If the comment does not exist, send a 404 error.
    if (commentIndex === -1) {
      return next(error(404, "Comment Not Found"));
    }

    // Remove the comment from the array.
    // splice returns an array, so we use [0] to get the deleted comment object.
    const deletedComment = comments.splice(commentIndex, 1)[0];

    // Send back the deleted comment so we can confirm what was removed.
    res.json(deletedComment);
  });
export default router;