const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllRoles = async () => {
    const result = await mongodb.getDatabase().db().collection('roles').find();
    return result.toArray();
};

const getSingleRole = async (roleId) => {
    const result = await mongodb.getDatabase().db().collection('roles').find({ _id: new ObjectId(roleId) });
    const roles = await result.toArray();
    return roles[0];
};

const updateRole = async (roleId, role) => {
    if (!role.login || !role.role) {
        throw new Error('All fields (rolename, fullname, email, password) are required.');
    }

    const response = await mongodb.getDatabase().db().collection('roles').replaceOne({ _id: new ObjectId(roleId) }, role);
    return response;
};

const deleteRole = async (roleId) => {
    const response = await mongodb.getDatabase().db().collection('roles').deleteOne({ _id: new ObjectId(roleId) });
    return response;
};

const createRole = async (role) => {
    if (!role.login || !role.role) {
        throw new Error('All fields (rolename, fullname, email, password) are required.');
    }

    const response = await mongodb.getDatabase().db().collection('roles').insertOne(role);
    return response;
};

module.exports = {
    getAllRoles,
    getSingleRole,
    updateRole,
    deleteRole,
    createRole
};
