const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    deleteUser,
    createUser,
    updateUser,
    createFriend,
    deleteFriend,
} = require ('../../controllers/userController');