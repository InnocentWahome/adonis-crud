/* eslint-disable camelcase */
/* eslint-disable no-console */
// .env file configurations
require('dotenv/config');

// importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// database configurations
require('./config/database')(mongoose);

// importing routes form .routes
const {
  AuthenticationRoutes,
  UserRoute,
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

// routes
app.use('/api/v1/auth', AuthenticationRoutes);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/projects', ProjectRoutes);
app.use('/api/v1/tasks', TaskRoutes);
app.use('/api/v1/teams', TeamRoutes);

// define the port
const port = parseInt(process.env.PORT, 10) || 5000;

// port listening
app.listen(port, () => {
  try {
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.error(error);
  }
});
