/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  avatar: {
    type: String,
    required: false,
    unique: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Employee', 'Admin'],
    default: 'Employee',
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: String,
  dateOfBirth: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

// UserSchema.pre('save', function () {
//   if (this.isModified('password')) {
//     const salt = bcrypt.genSalt(10);
//     bcrypt.hash(this.password, salt);
//   }
// });

module.exports = model('User', UserSchema);
