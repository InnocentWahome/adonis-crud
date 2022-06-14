/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

const AuthenticationSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['employee', 'admin'],
    default: 'employee',
  },
  phoneNumber: {
    type: Number,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

// AuthenticationSchema.pre('save', function () {
//   if (this.isModified('password')) {
//     const salt = bcrypt.genSalt(10);
//     bcrypt.hash(this.password.toString(), salt);
//   }
// });

module.exports = model('Authentication', AuthenticationSchema);
