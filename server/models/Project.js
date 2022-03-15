const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
  project_name: String,
  project_lead: String,
  project_category: String,
  project_team: String,
  project_description: String,
  start_date: Date,
  due_date: Date
})

module.exports = model('Project', ProjectSchema);