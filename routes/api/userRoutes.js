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

// /api/users
router.route('/').get(getUsers).post(createUser);


// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId').get(getSingleUser).put(updateUser);

// /api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(createFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;