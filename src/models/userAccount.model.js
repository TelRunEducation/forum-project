import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        alias: 'login'
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        default: ['User'],
    }
}, {
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            ret.login = ret._id;
            delete ret._id;
            delete ret.password;
        }
    }
});

export default mongoose.model('UserAccount', userAccountSchema, 'users');