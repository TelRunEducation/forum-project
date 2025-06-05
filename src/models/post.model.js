import mongoose from 'mongoose';
import commentSchema from "./comment.model.js";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [commentSchema],
    default: [],
  }
}, {
  versionKey: false,
  toJSON: {
    transform(doc, rec) {
      rec.id = rec._id;
      delete rec._id;
    }
  }
})

export default mongoose.model('Post', postSchema, 'posts');