import userRepository from "../repositories/user.repository.js";
import {hashUserPassword} from "../lib/passwordHash.js";

class UserService {

  register = async (credentials) => {
    const {password} = credentials;
    credentials.password = await hashUserPassword(password);
    await userRepository.signUp(credentials);
  }

  addRole = async (login, role) => {
    return await userRepository.addRole(login, role);
  }

  getUserWithRoles = async (login) => {
    return await userRepository.getUserWithRoles(login);
  }



}

export default new UserService;