import UserAccount from '../models/userAccount.model.js';

class UserAccountRepository{
    async addUser(user){
        const userAccount = new UserAccount(user);
        return userAccount.save();
    }

    async findUser(login){
        return UserAccount.findById(login);
    }

    async removeUser(login){
        return UserAccount.findByIdAndDelete(login);
    }

    async updateUser(login, user){
        return UserAccount.findByIdAndUpdate(login, user, {new: true});
    }

    async addRole(login, role){
        return UserAccount.findByIdAndUpdate(login, {$addToSet: {roles: role}}, {new: true});
    }

    async removeRole(login, role){
        return UserAccount.findByIdAndUpdate(login, {$pull: {roles: role}}, {new: true});
    }

    async changePassword(login, password){
        return UserAccount.findByIdAndUpdate(login, {$set: {password}}, {new: true});
    }
}

export default new UserAccountRepository();