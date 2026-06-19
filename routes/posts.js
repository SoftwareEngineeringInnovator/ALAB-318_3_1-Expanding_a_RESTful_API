import express from 'express'
const router = express.Router();
import posts from '../data/posts.js';
import error from '../utilities/error.js';
import comments from '../data/comments.js';

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    // req.query allow us to read values from the URL after the ? symbol.
    const userId = req.query.userId;

    // Return posts for that user.
    if (userId) {
      const filteredPosts = posts.filter((post) => post.userId === Number(userId));

      return res.json({
        posts: filteredPosts,
        links,
      });
    }

    // Return all posts
    res.json({ posts, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

 // GET /api/posts/:id/comments, gets all comments specific post.
router.get("/:id/comments", (req, res, next) => {
  const postId = Number(req.params.id);

  // First, check if the post exists.
  const post = posts.find((post) => post.id === postId);

  // If the post does not exist, send a 404 error.
  if (!post) {
    return next(error(404, "Post Not Found"));
  }

  // Find all comments where the postId matches the post id from the URL.
  const postComments = comments.filter((comment) => comment.postId === postId);

  res.json({
    post,
    comments: postComments,
  });
}); 

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

export default router