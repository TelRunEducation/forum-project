import AuthorizationTypes from "./authorizationTypes.js";

export default function ownerOrAdminAuth(authorizationType) {
  return async (req, res, next) => {
    const paramsLogin = req.params.user;

    const {login, roles} = req.principal;

    const isOwner = paramsLogin === login;
    const isAdmin = roles.includes('Admin')

    try {
      switch (authorizationType) {
        case AuthorizationTypes.ADMIN_ONLY:
          if (!isAdmin) return res.status(403).send('Access denied. Admin only.');
          break;
        case AuthorizationTypes.OWNER_ONLY:
          if (!isOwner) return res.status(403).send('Access denied. Owner only.');
          break;
        case AuthorizationTypes.ADMIN_OR_OWNER:
          if (!isAdmin && !isOwner)
            return res.status(403).send('Access denied. Owner or Admin only.');
          break;
        default:
          res.status(500).send('Server error. Authorization undefined');
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
}