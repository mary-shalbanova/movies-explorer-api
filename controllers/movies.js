const { CastError } = require('mongoose').Error;
const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');

const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/constants');

const getSavedMovies = async (req, res, next) => {
  try {
    const movieList = await Movie.find({ owner: req.user._id });
    res.status(STATUS_CODE_OK).send(movieList);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      owner: req.user._id,
      ...req.body,
    });
    res.status(STATUS_CODE_CREATED).send(movie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new NotFoundError('Передан неcуществующий _id фильма');
    }

    if (movie.owner.toString() === req.user._id) {
      await Movie.deleteOne(movie);
      res.status(STATUS_CODE_OK).send({
        message: 'Фильм удален',
      });
    } else {
      throw new ForbiddenError('Нет прав для удаления выбранного фильма');
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректный _id фильма'));
      return;
    }

    next(err);
  }
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};

// "country": "Russia",
// "director": "Balabanov",
// "duration": 120,
// "year": "2023",
// "description": "Cool",
// "image": "https://images.unsplash.com/photo-1682687219612-b12805df750d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
// "trailerLink": "https://images.unsplash.com/photo-1682687219612-b12805df750d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
// "nameRU": "Cool",
// "nameEN": "Cool",
// "thumbnail": "https://images.unsplash.com/photo-1682687219612-b12805df750d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
// "movieId": 1
