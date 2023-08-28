const usersRoutes = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidation } = require('../middlewares/userValidation');

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = usersRoutes;
