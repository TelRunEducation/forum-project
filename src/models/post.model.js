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

postSchema.pre(['save'], function (next) {
  if (Array.isArray(this.tags)) {
    this.tags = this.tags.map(tag => tag.toLowerCase());
  }
  next();
});

postSchema.pre(['update', 'findOneAndUpdate'], function (next) {
  const update = this.getUpdate();

  if (update?.$addToSet?.tags?.$each) {
    update.$addToSet.tags.$each = update.$addToSet.tags.$each.map(tag =>
      tag.toLowerCase()
    );
  }

  if (Array.isArray(update?.$set?.tags)) {
    update.$set.tags = update.$set.tags.map(tag => tag.toLowerCase());
  }

  this.setUpdate(update);
  next();
});

export default mongoose.model('Post', postSchema, 'posts');