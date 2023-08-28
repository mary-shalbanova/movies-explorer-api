const moviesRoutes = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, movieIdValidation } = require('../middlewares/movieValidation');

moviesRoutes.get('/', getSavedMovies);
moviesRoutes.post('/', createMovieValidation, createMovie);
moviesRoutes.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = moviesRoutes;
