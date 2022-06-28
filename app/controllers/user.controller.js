const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  /**
   * GET /api/v1/users
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  index: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved all users',
        data: users,
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
   * POST /api/v1/users
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  create: async (req, res) => {
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
   * GET /api/v1/users/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  show: async (req, res) => {
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
   * PUT /api/v1/users/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  update: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          role: req.body.role,
          isAdmin: req.body.isAdmin,
          password: hash,
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

  /**
   * DELETE /api/v1/users/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  delete: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Successfully deleted the user',
        data: null,
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
