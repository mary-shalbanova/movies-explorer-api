const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');

const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/constants');

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hash,
    });
    res.status(STATUS_CODE_CREATED).send({
      name,
      email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      return;
    }

    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильный логин или пароль');
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new UnauthorizedError('Неправильный логин или пароль');
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
    res.send({ _id: user._id });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.status(STATUS_CODE_OK).clearCookie('jwt').send({ message: 'Выполнен выход' });
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким _id');
    }
    res.status(STATUS_CODE_OK).send({ name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, {
      new: true,
      runValidators: true,
    });
    res.status(STATUS_CODE_OK).send({ name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  login,
  logout,
  getCurrentUser,
  updateUserInfo,
};
