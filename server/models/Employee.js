const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  role: String,
  phone_number: Number,
  password: String,
  member_since: Date,
  date_of_birth: Date,
  is_admin: Boolean
})

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;