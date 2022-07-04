/* eslint-disable no-dupe-keys */
const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: false,
    type: String,

  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    type: String,
  },
  reporter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    type: String,
  },
  progress: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Un Assigned', 'To Do', 'In Progress', 'In Review', 'Completed'],
    default: 'initiated',
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = model('Task', TaskSchema);
