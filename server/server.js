//importing required modules
require('dotenv/config');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//connect to mongodb online
mongoose.connect(
  "mongodb+srv://innocent:wahome2020@timetracker.elei8.mongodb.net/TaskTracker?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true }
);

//initialize the app
const app = express();

//import required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//include model collections from models folder
// const User = require("./models/User");
const Employee = require("./models/Employee");
const Project = require("./models/Project");
const Task = require("./models/Task");





//Routes
//Signup --- post route
// app.post("/signup", (req, res, next) => {
//   const newUser = new User({
//     email: req.body.email,
//     name: req.body.name,
//     password: bcrypt.hashSync(req.body.password, 10),
//   });
//   newUser.save((err) => {
//     if (err) {
//       return res.status(400).json({
//         title: "error",
//         error: "email in use",
//       });
//     }
//     return res.status(200).json({
//       title: "signup success",
//     });
//   });
// });
//grabbing user info
// app.get("/user", (req, res, next) => {
//   let token = req.headers.token; //token
//   jwt.verify(token, "secretkey", (err, decoded) => {
//     if (err)
//       return res.status(401).json({
//         title: "unauthorized",
//       });
//     //token is valid
//     User.findOne({ _id: decoded.userId }, (err, user) => {
//       if (err) return console.log(err);
//       return res.status(200).json({
//         title: "user grabbed",
//         user: {
//           email: user.email,
//           name: user.name,
//         },
//       });
//     });
//   });
// });









//Login ---post route
app.post("/login", (req, res, next) => {
  Employee.findOne({ email: req.body.email }, (err, employee) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    if (!employee) {
      return res.status(401).json({
        title: "user not found",
        error: "Invalid Credentials",
      });
    }
    //incorrect password
    if (!bcrypt.compareSync(req.body.password, employee.password)) {
      return res.status(401).json({
        tite: "login failed",
        error: "invalid credentials",
      });
    }
    //IF ALL IS GOOD --- create a token and send to frontend
    let token = jwt.sign({ employeeId: employee._id }, "secretkey");
    return res.status(200).json({
      title: "login sucess",
      token: token,
    });
  });
});







//SignUp && Adding A new Employee Route
app.post("/addemployee", (req, res, next) => {
  const newEmployee = new Employee({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 10),
    phone_number: req.body.phone_number,
    member_since: req.body.member_since,
    date_of_birth: req.body.date_of_birth,
  });
  console.log(newEmployee);
  newEmployee.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "Employee exists",
      });
    }
    return res.status(200).json({
      title: "Registration success",
    });
  });
});





//Getting All Employees From Database
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved all employees',
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
})





//Getting All Project From Database
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved all projects',
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
})






//Getting All Tasks From Database
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved all tasks',
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
})





//Getting All Tasks by User's ID to display on the MYTASKS route
app.get('/tasks/:id', async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved all tasks',
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
})






//UPdateing Tasks
app.put('/tasks/:id', async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id, req.body, { upsert: true });
    res.status(200).json({
      success: true,
      message: 'Successfully updated the tasks',
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
})





//Deleting A Task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const tasks = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Successfully delete the task',
      data: '',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
})







//Posting A New Project Route
app.post("/addproject", (req, res, next) => {
  const newProject = new Project({
    project_name: req.body.project_name,
    project_lead: req.body.project_lead,
    project_category: req.body.project_category,
    project_team: req.body.project_team,
    project_description: req.body.project_description,
    start_date: req.body.start_date,
    due_date: req.body.due_date,
  });
  console.log(newProject);
  newProject.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "Project exists",
      });
    }
    return res.status(200).json({
      title: "Project Registration Success",
    });
  });
});






// Posting a New Task Route
app.post("/addtask", (req, res, next) => {
  const newTask = new Task({
    task_name: req.body.task_name,
    project_name: req.body.project_name,
    employee_assigned: req.body.employee_assigned,
    task_description: req.body.task_description,
    start_date: req.body.start_date,
    due_date: req.body.due_date,
  });
  console.log(newTask);
  newTask.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "Task exists",
      });
    }
    return res.status(200).json({
      title: "Task Registration Success",
    });
  });
});

app.get("/", (req, res) => {
  res.send("Your server is running");
});

//define the port
const port = parseInt(process.env.PORT, 10) || 5050;


//port listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
