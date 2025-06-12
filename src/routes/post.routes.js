import express from "express";
import postController from "../controllers/post.controller.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.post('/post/:author', validate('createPost') , postController.createPost);
router.get('/post/:id', postController.getPostById);

export default router;