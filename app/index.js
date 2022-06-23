/* eslint-disable camelcase */
/* eslint-disable no-console */
// .env file configurations
require('dotenv/config');

// importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// database configurations
require('./config/database')(mongoose);
const User = require('./models/employee.model');

// importing routes form .routes
const {
  AuthenticationRoutes,
  EmployeeRoutes,
  ProjectRoutes,
  TaskRoutes,
  TeamRoutes,
} = require('./routes');

// initializing the app
const app = express();

app.use(
  '/healthcheck',
  require('express-healthcheck')({
    healthy() {
      return { everything: 'is ok' };
    },
  }),
);

//  required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Default server port
app.get('/api/v1', (req, res) => {
  res.send('Your server is running');
});

// Login ---post route
app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
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
    if (!bcrypt.compare(req.body.password.toString(), user.password)) {
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
});
// routes
app.use('/api/v1/auth', AuthenticationRoutes);
app.use('/api/v1/employees', EmployeeRoutes);
app.use('/api/v1/projects', ProjectRoutes);
app.use('/api/v1/tasks', TaskRoutes);
app.use('/api/v1/teams', TeamRoutes);

// define the port
const port = parseInt(process.env.PORT, 10) || 3000;

// port listening
app.listen(port, () => {
  try {
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.error(error);
  }
});
