import validate from "../middleware/validation.middleware.js";
import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router()


router.post('/register', userController.register)
router.patch('/user/:user/role/:role', userController.addRole)

export default router;