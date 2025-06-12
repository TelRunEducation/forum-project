import validate from "../middleware/validation.middleware.js";
import userAccountController from "../controllers/userAccount.controller.js";
import postController from "../controllers/post.controller.js";
import express from "express";

const router = express.Router();

router.post('/account/register', validate('register'), userAccountController.register);
router.get('/forum/posts/tags', postController.getPostsByTags);
router.get('/forum/posts/period', validate('dateFormat', 'query'), postController.getPostsByPeriod);

export default router;
