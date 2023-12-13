const Validator = require('validatorjs');

const validateUser = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        fullname: 'required|string',
        email: 'required|email',
        favoriteColor: 'string',
        birthday: ['required', 'date'],
        country: 'string',
        password: ['required', `regex:${/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/}`]
    };

    const validation = new Validator(req.body, validationRule);

    validation.passes(() => {
        // Additional logic for custom date format validation
        if (!isValidDateFormat(req.body.birthday, 'MM/DD/YYYY')) {
            validation.errors.add('birthday', 'Birthday must be in MM/DD/YYYY format');
            return res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: validation.errors.all()
            });
        }
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
    validateUser
};
