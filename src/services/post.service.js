import postRepository from "../repositories/post.repository.js";

class PostService {
    async createPost(author, data) {
        return await postRepository.createPost({author, ...data});
    }

    async getPostById(id) {
        const post = await postRepository.findPostById(id);
        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }
        return post;
    }

    async addLike(id) {
        // TODO like post
    }

    async getPostsByAuthor(author) {
        // TODO find post by author
    }

    async addComment(id, commenter, message) {
        // TODO add comment to post
    }

    async deletePost(id) {
        // TODO delete post
    }

    async getPostsByTags(tags) {
        // TODO find posts by tags
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        // TODO find posts by period
    }

    async updatePost(id, data) {
        // TODO update post title, tags, content
    }
}

export default new PostService();