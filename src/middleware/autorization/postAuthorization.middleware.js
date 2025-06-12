import postAccount from "../../models/post.model.js";

export default function postAuthorization(includeModerator = false) {
  return async (req, res, next) => {
    try {
      const {login, roles} = req.principal;
      if (includeModerator && roles.includes('Moderator')) {
        next();
        return;
      }
      const postId = req.params.id;
      const post = await postAccount.findById(postId)

      if (!(login === post.author)) {
        return res.status(403).send('Access denied. Owner or Moderator only.');
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
}