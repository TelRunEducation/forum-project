import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    login: {
      type: String,
      required: true,
      unique: true,
      minlength: 6
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: [String],
      default: ['USER']
    }
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, rec) {
        rec.id = rec._id;
        delete rec._id;
        delete rec.password;
      }
    }
  });
export default mongoose.model('User', userSchema, 'users');