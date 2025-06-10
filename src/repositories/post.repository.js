import Post from '../models/post.model.js';

class PostRepository {
  async createPost(postData) {
    const post = new Post(postData);
    return post.save();
  }

  async findPostById(id) {
    return Post.findById(id);
  }

  deletePost = async (id) =>
    Post.findOneAndDelete({_id: id})

  findPotsByAuthor = async (author) =>
    Post.find({
      author: {$regex: `^${author}$`, $options: 'i'}
    })

  async addLike(postId) {
    return Post.findByIdAndUpdate(
      {_id: postId},
      {$inc: {likes: 1}},
      {new: true}
    )
  }

  async addComment(id, commenter, message) {
    return Post.findByIdAndUpdate(
      {_id: id},
      {
        $push: {
          comments: {
            commenter,
            message
          }
        }
      },
      {new: true}
    )
  }

  async findPostsByTags(tags) {
    const regexFilters = tags.map(tag => ({
      tags: {$regex: `^${tag}$`, $options: 'i'}
    }));

    return Post.find({
      $or: regexFilters
    });
  }

  async updatePost(id, {title, tags, content}) {
    return Post.findOneAndUpdate(
      {_id: id},
      {
        $set: {title, content},
        $addToSet: { tags: { $each: tags } }
      },
      {new: true})
  }

  async getPostsByPeriod(from, to) {
    return Post.find(
      {
        dateCreated: {
          $gte: from,
          $lte: to
        }
      })
  }
}

export default new PostRepository();