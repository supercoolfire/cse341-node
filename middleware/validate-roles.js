const Validator = require('validatorjs');

const validateRoles = (req, res, next) => {
    const validationRule = {
        login: 'required|string',
        role: 'required|string'
    };

    const validation = new Validator(req.body, validationRule);

    validation.passes(() => {
        next();
    });

    validation.fails(() => {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors.all()
        });
    });
};

module.exports = {
    validateRoles
};
