const routes = require('express').Router();
const adminRoutes = require('./admin');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');

routes.use('/', adminRoutes);

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);
routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
