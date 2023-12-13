const Validator = require('validatorjs');

const validateContact = (req, res, next) => {
    const validationRules = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'required|date',
        phoneNumber: 'required|string',
    };

    const customMessages = {
        'required.firstName': 'The first name field is required.',
        'string.firstName': 'The first name must be a valid string.',
        'required.lastName': 'The last name field is required.',
        'string.lastName': 'The last name must be a valid string.',
        'required.email': 'The email field is required.',
        'email.email': 'The email must be a valid email address.',
        'required.favoriteColor': 'The favorite color field is required.',
        'string.favoriteColor': 'The favorite color must be a valid string.',
        'required.birthday': 'The birthday field is required.',
        'date.birthday': 'The birthday must be a valid date.',
        'required.phoneNumber': 'The phone number field is required.',
        'string.phoneNumber': 'The phone number must be a valid string.',
    };

    const validation = new Validator(req.body, validationRules, customMessages);

    validation.passes(() => {
        next();
    });

    validation.fails(() => {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            errors: validation.errors.all(),
        });
    });
};

module.exports = {
    validateContact,
};
