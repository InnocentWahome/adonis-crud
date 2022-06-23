/* eslint-disable consistent-return */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

module.exports = {
  /**
   * POST /api/v1/auth/login
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  login: async (req, res) => {
    try {
      // await Employee.findOne({ email: req.body.email })
      //   .then((user, err) => {
      //     // catch any server errors
      //     if (err) {
      //       return res.status(500).json({
      //         success: false,
      //         message: 'server error',
      //         error: err,
      //       });
      //     }
      //     // if the user does not exist
      //     if (!user) {
      //       return res.status(404).json({
      //         success: false,
      //         message: 'User not found',
      //         data: {},
      //       });
      //     }
      //     // incorrect password
      //     if (bcrypt.compareSync(req.body.password, user.password)) {
      //       return res.status(401).json({
      //         success: false,
      //         message: 'Invalid Login Credentials',
      //         data: {},
      //       });
      //     }
      //     // IF ALL IS GOOD create a token and send to frontend
      //     // eslint-disable-next-line no-underscore-dangle
      //     const token = jwt.sign({ userId: user._id }, 'secretkey');
      //     return res.status(200).json({
      //       success: true,
      //       message: 'Successfully logged in',
      //       data: user,
      //       authToken: token,
      //     });
      //   });
      await Employee.findOne({
        email: req.body.email,
      }).then((user) => {
        if (!user) {
          return res.status(404).json({
            errors: [
              {
                user: 'not found',
              },
            ],
          });
        }
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              errors: [
                {
                  password: 'incorrect',
                },
              ],
            });
          }
          // // eslint-disable-next-line camelcase
          // const access_token = createJWT(
          //   user.email,
          //   // eslint-disable-next-line no-underscore-dangle
          //   user._id,
          //   3600,
          // );
          // jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
          //   decoded) => {
          //   if (err) {
          //     res.status(500).json({
          //       erros: err,
          //     });
          //   }
          //   if (decoded) {
          //     return res.status(200).json({
          //       success: true,
          //       token: access_token,
          //       message: user,
          //     });
          //   }
        });
      });
      return res.status(200).json({
        success: true,
        message: 'Successfully logged in',
      });

      // .catch((err) => {
      //     res.status(500).json({
      //       erros: err,
      //     });
      //   });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
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
      // const thePassword = req.body.password;
      // const saltRounds = 10;
      // bcrypt.genSalt(saltRounds, (saltError, salt) => {
      //   if (saltError) {
      //     throw saltError;
      //   } else {
      //     bcrypt.hash(thePassword, salt, (hashError, hash) => {
      //       if (hashError) {
      //         throw hashError;
      //       } else {
      //         console.log(hash);
      //         // $2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
      //       }
      //     });
      //   }
      // });
      const password = req.body.password.toString();
      // const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hash(password, 10);
      const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        email: req.body.email,
        name: req.body.name,
        password: hash,
        isAdmin: req.body.isAdmin,
      });
      await Employee.findOne({
        email: req.body.email,
      }).then((user) => {
        if (user) {
          return res.status(400).json({
            success: false,
            message: 'Email already in use',
            data: req.body.email,
          });
        }
        employee.save();
      });
      return res.status(200).json({
        success: true,
        message: 'Successfully created the user',
        data: employee,
      });
      // await employee.save((err) => {
      //   if (err) {
      //     return res.status(400).json({
      //       success: false,
      //       message: 'Email already in use',
      //       data: employee,
      //     });
      //   }
      //   return res.status(200).json({
      //     title: 'signup success',
      //   });
      // });
      // return res.status(200).json({
      //   success: true,
      //   message: 'Successfully created the user',
      //   data: employee,
      // });
      // const {
      //   name, email, password, password_confirmation,
      // } = req.body;
      // Employee.findOne({ email })
      //   .then((user) => {
      //     if (user) {
      //       return res.status(422).json({ errors: [{ user: 'email already exists' }] });
      //     } else {
      //       // eslint-disable-next-line no-shadow
      //       const user = new Employee({
      //         name,
      //         email,
      //         password,
      //       });
      // bcrypt.genSalt(10, (err, salt) => {
      //   bcrypt.hash(password, salt, (err, hash) => {
      //     if (err) throw err;
      //     user.password = hash;
      //     user.save()
      //       .then((response) => {
      //         res.status(200).json({
      //           success: true,
      //           result: response,
      //         });
      //       })
      //       .catch((err) => {
      //         res.status(500).json({
      //           errors: [{ error: err }],
      //         });
      //       });
      //   });
      // });
      //   }
      // }).catch((err) => {
      //   res.status(500).json({
      //     errors: [{ error: 'Something went wrong' }],
      //   });
      // });
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: error.message,
      //   data: error,
      // });
      console.log(error);
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
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({
          success: true,
          message: 'Employee not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved the employee',
        data: employee,
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
      const employee = await Employee.findByIdAndUpdate(
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
      if (!employee) {
        return res.status(404).json({
          success: true,
          message: 'Employee not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully updated the employee',
        data: employee,
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
