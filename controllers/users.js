const usersModel = require('../models/usersModel');

const getAllUsers = async (req, res) => {
    console.log('Get All for users');
    //#swagger.tags = ['users']
    try {
        const users = await usersModel.getAllUsers();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching users.');
    }
};

const getSingleUser = async (req, res) => {
    console.log('Get Single for user');
    //#swagger.tags = ['users']
    const userId = req.params.id;
    try {
        const user = await usersModel.getSingleUser(userId);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching the user.');
    }
};

const updateUser = async (req, res) => {
    console.log('Update user');
    //#swagger.tags = ['users']
    const userId = req.params.id;
    const user = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        country: req.body.country,
        password: req.body.password
    };

    try {
        await usersModel.updateUser(userId, user);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while updating this user.');
    }
};

const deleteUser = async (req, res) => {
    console.log("Delete users");
    //#swagger.tags = ['users']
    const userId = req.params.id;

    try {
        const response = await usersModel.deleteUser(userId);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting this user.');
        }
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while deleting this user.');
    }
};

const createUser = async (req, res) => {
    console.log("create users");
    //#swagger.tags = ['users']
    const user = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        country: req.body.country,
        password: req.body.password
    };

    try {
        await usersModel.createUser(user);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while creating the user.');
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
