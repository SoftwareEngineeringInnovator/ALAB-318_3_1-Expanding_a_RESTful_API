import express from 'express'
const router = express.Router();

import comments from '../data/comments.js';
import error from '../utilities/error.js';

router
  .route("/")
  .get((req, res) => {
    // GET /api/comments. Returns all comments, based on lab the array is empty
    res.json({comments,

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

export default router;