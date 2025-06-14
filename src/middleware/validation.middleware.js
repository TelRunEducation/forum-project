import Joi from 'joi';

const schemas = {
    createPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    }),

    addComment: Joi.object({
        message: Joi.string().required()
    }),

    updatePost: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        tags: Joi.array().items(Joi.string())
    }),

    dateFormat: Joi.object({
        dateFrom: Joi.date().iso().required(),
        dateTo: Joi.date().iso().required()
    }),

    register: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    }),

    updateUser: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
    }),

    changeRoles: Joi.object({
        role: Joi.string().valid('User', 'Moderator', 'Administrator'),
        user: Joi.string().required()
    })

}

const validate = (schemaName, target = 'body') => {
    return (req, res, next) => {
        const schema = schemas[schemaName];

        if (!schema) {
            return next(new Error(`Schema ${schemaName} not found`));
        }

        const {error} = schema.validate(req[target]);

        if (error) {
            return res.status(400).send({
                code: 400,
                status: 'Bad request',
                message: error.details[0].message,
                path: req.path
            });
        }

        next();
    }
}

export default validate;