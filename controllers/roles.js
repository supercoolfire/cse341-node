const rolesModel = require('../models/rolesModel');

const getAllRoles = async (req, res) => {
    console.log('Get All for roles');
    //#swagger.tags = ['roles']
    try {
        const roles = await rolesModel.getAllRoles();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching roles.');
    }
};

const getSingleRole = async (req, res) => {
    console.log('Get Single for role');
    //#swagger.tags = ['roles']
    const roleId = req.params.id;
    try {
        const role = await rolesModel.getSingleRole(roleId);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while fetching the role.');
    }
};

const updateRole = async (req, res) => {
    console.log('Update role');
    //#swagger.tags = ['roles']
    const roleId = req.params.id;
    const role = {
        login: req.body.login,
        role: req.body.role
    };

    try {
        await roleModel.updateRole(roleId, role);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while updating this role.');
    }
};

const deleteRole = async (req, res) => {
    console.log("Delete roles");
    //#swagger.tags = ['roles']
    const roleId = req.params.id;

    try {
        const response = await roleModel.deleteRole(roleId);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting this role.');
        }
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while deleting this role.');
    }
};

const createRole = async (req, res) => {
    console.log("create roles");
    //#swagger.tags = ['roles']
    const role = {
        login: req.body.login,
        role: req.body.role
    };

    try {
        await roleModel.createRole(role);
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while creating the role.');
    }
};

module.exports = {
    getAllRoles,
    getSingleRole,
    createRole,
    updateRole,
    deleteRole
};
