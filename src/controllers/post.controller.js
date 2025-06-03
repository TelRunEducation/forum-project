import postService from '../services/post.service.js';

class PostController {
    async createPost(req, res, next) {
        try {
            const post = await postService.createPost(req.params.author, req.body);
            res.status(201).json(post);
        } catch (err) {
            next(err);
        }
    }

    async getPostById(req, res, next) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.status(200).json(post);
        }catch(err) {
            next(err);
        }
    }
}

export default new PostController();