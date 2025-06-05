import express from 'express'
import postController from '../controllers/post.controller.js'
import validate from "../middleware/validation.middleware.js";

const router = express.Router()

router.post('/post/:author', validate('createPost'), postController.createPost)
router.get('/post/:id', postController.getPost)
router.delete('/post/:id', postController.deletePost)
router.get('/posts/author/:user', postController.findPostByAuthor)
router.patch('/post/:postId/like', postController.addLikeToPost)
router.get('/posts/tags', postController.getPostsByTags)
router.patch('/post/:postId/comment/:commenter', postController.addComment)
router.patch('/post/:postId', postController.updatePost)

export default router;