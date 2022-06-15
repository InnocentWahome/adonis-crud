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
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  }],
}, {
  timestamps: true,
});

module.exports = model('Team', TeamSchema);
