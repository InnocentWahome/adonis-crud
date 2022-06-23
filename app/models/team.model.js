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
  responsibilities: {
    type: String,
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    type: String,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = model('Team', TeamSchema);
