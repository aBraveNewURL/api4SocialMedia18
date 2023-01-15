const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController')

router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;