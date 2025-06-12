import express from "express";
import userAccountController from "../controllers/userAccount.controller.js";
import validate from "../middleware/validation.middleware.js";
import authorization from "../middleware/autorization/authorization.middleware.js";
import AuthorizationTypes from "../middleware/autorization/authorizationTypes.js";

const router = express.Router();

// router.post(
//   '/register', validate('register'), userAccountController.register);

router.post('/login', userAccountController.login);

router.delete(
  '/user/:user',
  authorization(AuthorizationTypes.ADMIN_OR_OWNER),
  userAccountController.deleteUser
);

router.patch(
  '/user/:user',
  validate('updateUser'),
  authorization(AuthorizationTypes.OWNER_ONLY),
  userAccountController.updateUser);

router.patch(
  '/user/:user/role/:role',
  validate('changeRoles', 'params'),
  authorization(AuthorizationTypes.ADMIN_ONLY),
  userAccountController.addRole);


router.delete(
  '/user/:user/role/:role',
  validate('changeRoles', 'params'),
  authorization(AuthorizationTypes.ADMIN_ONLY),
  userAccountController.deleteRole);


router.patch(
  '/password',
  authorization(AuthorizationTypes.OWNER_ONLY),
  userAccountController.changePassword);

router.get('/user/:user', userAccountController.getUser);

export default router;