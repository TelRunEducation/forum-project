import postRepository from "../repositories/post.repository.js";

class PostService {

  createPost = async (author, data) =>
    await postRepository.createPost({author, ...data});

  async getPost(id) {
    const post = await postRepository.findPostById(id);
    if (!post) {
      throw new Error(`Post with id ${id} is not found`);
    }
    return post;
  }

  async addLike(postId) {
    if (!(await postRepository.addLike(postId)))
      throw new Error(`Post with id ${postId} is not found`)
  }

  async getPostsByAuthor(author) {
    const posts = await postRepository.findPotsByAuthor(author);
    if (!posts || !posts.length) {
      throw new Error(`Posts created by ${author} are not found`);
    }
    return posts;
  }

  async addComment(id, commenter, message) {
    if (!message || !commenter) {
      throw new Error(`Bad request  `);
    }
    const commentedPost = await postRepository.addComment(id, commenter, message);
    if (!commentedPost) {
      throw new Error(`Post with id ${id} not found`);
    }
    return commentedPost;
  }

  async deletePost(id) {
    const deletedUser = await postRepository.deletePost(id);
    if (!deletedUser) {
      throw new Error(`Post with id ${id} not found`);
    }
    return deletedUser;
  }

  async getPostsByTag(rawTags) {
    // tags must be a single string with values split by comma
    if (!rawTags || rawTags.length > 1) {
      throw new Error('Bad request. Tags must be sent as one string');
    }
    const tags = rawTags[0].split(',')
    if (tags.length === 0) {
      throw new Error(`Bag request: now tags found`);
    }
    return await postRepository.findPostsByTags(tags);
  }

  async getPostsByPeriod(dateFrom, dateTo) {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    if (!dateFrom || !dateTo) throw new Error("Bad request. Dates are not valid")

    if (from >= to) throw new Error("Bad request. Dates are not valid")

    return await postRepository.getPostsByPeriod(from, to);

  }

  async updatePost(id, data) {
    return await postRepository.updatePost(id, data);
  }
}

export default new PostService;