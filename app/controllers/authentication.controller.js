/* eslint-disable consistent-return */
/* eslint-disable no-console */
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
      // // incorrect password
      // if (!bcrypt.compareSync(req.body.password.toString(), user.password)) {
      //   return res.status(401).json({
      //     success: false,
      //     message: 'Invalid Login Credentials',
      //     data: {},
      //   });
      // }
      if (req.body.password.toString() !== user.password.toString()) {
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
      // const { password } = req.body;
      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(password, salt);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
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
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          service: 'gmail',
          auth: {
            user: 'innocentwahome@gmail.com',
            pass: 'lesokqoeaiazzffg',
          },
        });
        const token = jwt.sign({ email: req.body.email }, 'secretkey');
        const mailResponseBody = `Dear ${req.body.email}, <br> We have received your request to change password. Please click the link below to reset your password.<br><br>https://kaziflow.netlify.app/reset-password?token=${token}`;
        const mailOptions = {
          from: 'innocentwahome@gmail.com',
          to: req.body.email,
          subject: 'Reset Password Request',
          html: mailResponseBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
        return res.status(200).json({
          success: true,
          message: 'Verification email sent!',
        });
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
        if (req.body.password !== req.body.confirmPassword) {
          return res.status(401).json({
            success: false,
            message: 'Passwords do not match',
            data: {},
          });
        }
        User.findOne({ email: req.body.email }, () => {
          // update user password req.body.password
        });
        return res.status(200).json({
          success: true,
          message: 'Password has been reset!',
        });
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
