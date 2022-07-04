/* eslint-disable no-dupe-keys */
const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    type: String,
    unique: false,
  },
  category: {
    type: String,
    enum: ['blockchain', 'website', 'application'],
    default: 'application',
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    type: String,

  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
    type: String,
  }],
  progress: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Initiated', 'In Progress', 'Completed', 'Terminated'],
    default: 'initiated',
  },
  endDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = model('Project', ProjectSchema);
