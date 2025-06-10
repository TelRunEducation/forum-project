import User from '../models/user.model.js';

class UserRepository {

  async signUp(credentials) {
    if (await User.findOne({
      $or: [
        { login: credentials.login},
        { password: credentials.password },
      ]
    })) {
      throw new Error(`${BAD_CREDENTIALS} Login or password already exists`);
    }
    const user = new User(credentials);
    return user.save();
  }

  // updateUser(user, userData) {
  //
  // }

  deleteUser = async (login) =>
    User.findOneAndDelete({login})

  addRole = async (login, role) => {
    console.log(login, role);
    const result = await User.updateOne(
      {login},
      {
        $addToSet: {roles: role}
      })
    console.log(result)
    return result.modifiedCount
  }

  getUserWithRoles = async (login) =>
    User.findOne({login}).select('login roles -_id')

  deleteRole = async (login, role) => {
    // do not remove the only role
    const result = await User.updateOne(
      {
        login,
        roles: {$size: {$gt: 1}}
      },
      {
        $pull: {roles: role}
      })
    return result.modifiedCount
  }
}

export default new UserRepository();