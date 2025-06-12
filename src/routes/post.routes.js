import express from "express";
import postController from "../controllers/post.controller.js";
import validate from "../middleware/validation.middleware.js";
import authorization from "../middleware/autorization/authorization.middleware.js";
import postAuthorizationMiddleware from "../middleware/autorization/postAuthorization.middleware.js";
import AuthorizationTypes from "../middleware/autorization/authorizationTypes.js";

const router = express.Router();

router.post('/post/:author',
  validate('createPost'),
  authorization(AuthorizationTypes.OWNER_ONLY, 'author'),
  postController.createPost);

router.get('/post/:id', postController.getPostById);
router.patch('/post/:id/like', postController.addLike);

router.get('/posts/author/:author',
  postController.getPostsByAuthor,
  authorization(AuthorizationTypes.OWNER_ONLY, 'author'),
);
router.patch(
  '/post/:id/comment/:commenter',
  validate('addComment'),
  authorization(AuthorizationTypes.OWNER_ONLY, 'commenter'),
  postController.addComment);

router.delete(
  '/post/:id',
  postAuthorizationMiddleware(true),
  postController.deletePost);

// router.get('/posts/tags', postController.getPostsByTags);
// router.get('/posts/period', validate('dateFormat', 'query'), postController.getPostsByPeriod);

router.patch('/post/:id',
  validate('updatePost'),
  postAuthorizationMiddleware(),
  postController.updatePost);

export default router;