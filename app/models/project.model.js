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
    ref: 'Employee',
    //   required: false,
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
  endDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = model('Project', ProjectSchema);
