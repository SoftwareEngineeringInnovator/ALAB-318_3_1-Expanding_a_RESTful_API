import express from 'express'
const router = express.Router();

import comments from '../data/comments.js';
import error from '../utilities/error.js';

router
  .route("/")
  .get((req, res) => {
    // GET /api/comments. Returns all comments, based on lab the array is empty
    res.json({
      comments,
    });
  });

export default router;