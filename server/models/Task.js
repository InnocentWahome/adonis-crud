const { Schema, model } = require('mongoose');


const TaskSchema = new Schema({
  task_name: String,
  project_name: String,
  employee_assigned: String,
  task_description: String,
  start_date: Date,
  due_date: Date
})

module.exports = model('Task', TaskSchema);




