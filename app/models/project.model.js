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
  // lead: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Employee',
  //   required: false,
  // },
  leader: {
    type: String,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    enum: ['blockchain', 'website', 'application'],
    default: 'application',
  },
  // team: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Team',
  // },
  team: {
    type: String,
    // enum: ['blockchain', 'website', 'application'],
    // default: 'application',
  },
  tasks: {
    type: String,
  },
  participants: {
    type: String,
  },
  progress: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['initiated', 'in-progress', 'completed', 'terminated'],
    default: 'initiated',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = model('Project', ProjectSchema);
