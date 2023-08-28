const adminRoutes = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/userValidation');

adminRoutes.post('/signup', createUserValidation, createUser);
adminRoutes.post('/signin', loginValidation, login);
adminRoutes.post('/signout', logout);

module.exports = adminRoutes;
