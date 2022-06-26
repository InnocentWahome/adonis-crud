/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

const UserSchema = new Schema({
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
