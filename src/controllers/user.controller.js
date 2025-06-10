import userService from "../service/user.service.js";

class UserController {
  async register(req, res) {
    const user = await userService.register(req.body);
    res.json(user)
  }

  async addRole(req, res) {
    const login = req.params.user;
    const rowsUpdated = await userService.addRole(login, req.params.role);
    (rowsUpdated === 1) ? res.json(await userService.getUserWithRoles(login)) : res.status(403).send();
  }
}

export default new UserController();