const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[А-Яа-яЁёA-Za-z0-9\W]/.test(v);
      },
      message: 'Название фильма должно быть на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[A-Za-z0-9\s]/.test(v);
      },
      message: 'Название фильма должно быть на английском языке',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
