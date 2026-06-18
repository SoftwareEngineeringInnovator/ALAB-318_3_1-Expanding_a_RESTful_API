import express from 'express'
const router = express.Router()

import users from '../data/users.js'
import error from '../utilities/error.js'
import posts from '../data/posts.js' // This import will alow user to look inside the post array

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ users, links });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

// GET /api/users/:id/posts => Route to get all posts created by one a user
// Example: /api/users/1/posts?api-key=perscholas
router.get("/:id/posts", (req, res, next) => {
  
  // the URL is /api/users/1/posts, then req.params.id is "1".
  const userId = Number(req.params.id);

  // Check if the user exists.
  const user = users.find((u) => u.id === userId);

  // If the user does not exist, send the request to the 404 error handler.
  if (!user) {
    return next(error(404, "User Not Found"));
  }

  // Find all posts where the post's userId matches the user id from the URL.
  const userPosts = posts.filter((post) => post.userId === userId);

  // Send back the user and their posts.
  res.json({
    user,
    posts: userPosts,
  });
});

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

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

    if (user) res.json({ user, links });
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

export default router