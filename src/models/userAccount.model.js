import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userAccountSchema = new mongoose.Schema({
    _id: {
        type: String,
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

userAccountSchema.pre('save', async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

userAccountSchema.methods.comparePassword = async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
}

export default mongoose.model('UserAccount', userAccountSchema, 'users');