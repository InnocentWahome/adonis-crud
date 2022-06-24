/* eslint-disable consistent-return */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  /**
   * POST /api/v1/auth/login
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  login: async (req, res) => {
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'server error',
          error: err,
        });
      }
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          data: {},
        });
      }
      // incorrect password
      if (!bcrypt.compareSync(req.body.password.toString(), user.password)) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Login Credentials',
          data: {},
        });
      }

      // IF ALL IS GOOD create a token and send to frontend
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ userId: user._id }, 'secretkey');
      return res.status(200).json({
        success: true,
        message: 'Successfully logged in',
        data: user,
        authToken: token,
      });
    });
  },
  /**
   * POST /api/v1/auth/register
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  register: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        email: req.body.email,
        name: req.body.name,
        password: hash,
        isAdmin: req.body.isAdmin,
      };
      await User.create(user);
      return res.status(200).json({
        success: true,
        message: 'Successfully created the user',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * POST /api/v1/auth/forgot-password
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  forgotPassword: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: true,
          message: 'User not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved the user',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * POST /api/v1/auth/reset-password
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  resetPassword: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
        },
        {
          new: true,
        },
      );
      if (!user) {
        return res.status(404).json({
          success: true,
          message: 'User not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully updated the user',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },
};
