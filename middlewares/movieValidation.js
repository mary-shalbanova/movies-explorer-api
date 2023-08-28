const { celebrate, Joi } = require('celebrate');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/),
    trailerLink: Joi.string().required().regex(/(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/),
    thumbnail: Joi.string().required().regex(/(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(/[А-Яа-яЁё0-9\W]/),
    nameEN: Joi.string().required().regex(/[A-Za-z0-9\s]/),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = { createMovieValidation, movieIdValidation };
