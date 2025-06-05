import postService from "../service/post.service.js";

class PostController {
  async createPost(req, res, next) {
    try {
      console.log(req.body);
      const post = await postService.createPost(req.params.author, req.body);
      res.status(201).json(post)
    } catch (err) {
      next(err)
    }
  }

  async getPost(req, res, next) {
    try {
      const post = await postService.getPost(req.params.id);
      res.status(200).json(post)
    } catch (e) {
      next(e)
    }
  }

  async deletePost(req, res, next) {
    res.status(200).json(await postService.deletePost(req.params.id))
  }

  async findPostByAuthor(req, res, next) {
    res.status(200).json(await postService.getPostsByAuthor(req.params.user));
  }

  async addComment(req, res, next) {
    res
      .status(200)
      .json(await postService.addComment(req.params.postId, req.params.commenter, req.body.message));
  }

  async addLikeToPost(req, res, next) {
    try {
      await postService.addLike(req.params.postId)
      res.status(200).type('text/plain').send('Post was liked');
    } catch (err) {
      next(err)
    }
  }

  async getPostsByTags(req, res, next) {
    const tags = Array.isArray(req.query.values) ? req.query.values : [req.query.values];
    try {
      const posts = await postService.getPostsByTag(tags);
      res.status(200).send(posts)

    } catch (err) {
      next(err)
    }
  }

  async updatePost(req, res, next) {
    try {
      const post = await postService.updatePost(req.params.postId, req.body);
      res.status(200).send(post)

    } catch (err) {
      next(err)
    }
  }
}

export default new PostController();