/* eslint-disable no-dupe-keys */
const { Schema, model } = require('mongoose');

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
    required: false,
    unique: false,
  },
  responsibilities: {
    type: String,
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    type: String,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = model('Team', TeamSchema);
