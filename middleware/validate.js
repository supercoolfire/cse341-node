const Validator = require('validatorjs');

const validateContact = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        fullname: 'required|string',
        email: 'required|email',
        password: ['required', `regex:${/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/}`]
    };

    const validation = new Validator(req.body, validationRule);

    validation.passes(() => {
        next();
    });

    const correctPasswordFormat = "Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character";

    validation.fails(() => {
        const errors = validation.errors.all();
    
        // Check if there is an error related to the password
        if (errors.password) {
            errors.password.push(correctPasswordFormat);
        } else {
            // If there's no password error yet, create a new array for password errors
            errors.password = [correctPasswordFormat];
        }

        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors.all()
        });
    });
};

const validateUser = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        fullname: 'required|string',
        email: 'required|email',
        favoriteColor: 'string',
        birthday: 'required|date|dateFormat:MM/DD/YYYY',
        country: 'string',
        password: ['required', `regex:${/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/}`]
    };

    const validation = new Validator(req.body, validationRule);

    validation.passes(() => {
        next();
    });

    const correctPasswordFormat = "Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter, and 1 special character";
    const correctBirthdayFormat = "Birthday must be in MM/DD/YYYY format";

    validation.fails(() => {
        const errors = validation.errors.all();
    
        // Check if there is an error related to the password
        if (errors.password) {
            errors.password.push(correctPasswordFormat);
        } else {
            // If there's no password error yet, create a new array for password errors
            errors.password = [correctPasswordFormat];
        }

        // Check if there is an error related to the birthday
        if (errors.birthday) {
            errors.birthday.push(correctBirthdayFormat);
        } else {
            // If there's no birthday error yet, create a new array for birthday errors
            errors.birthday = [correctBirthdayFormat];
        }

        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors.all()
        });
    });
};


module.exports = {
    validateUser,
    validateContact
};
