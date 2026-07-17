const Task = require("../models/task");


// Add Task

const addTask = async (req, res) => {
  try {
console.log("ADD TASK BODY:", req.body);
console.log("USER:", req.user);
    const {
      title,
      description,
      category,
      priority,
      dueDate
    } = req.body;


    const task = await Task.create({

      title,

      description,

      category,

      priority: priority || "Medium",

      dueDate,

      completed: false,

      createdBy: req.user.id

    });


    res.status(201).json(task);


  } catch (error) {
    console.log("ADD TASK ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};



// Get All Tasks
const getTasks = async (req, res) => {

  try {

    const {
      search,
      status,
      priority
    } = req.query;


    let filter = {
      createdBy: req.user.id
    };


    // Search by title
    if (search) {

      filter.title = {
        $regex: search,
        $options: "i"
      };

    }


    // Filter completed/pending
    if (status) {

      filter.completed = status === "completed";

    }


    // Filter priority
    if (priority) {

      filter.priority = priority;

    }


    const tasks = await Task.find(filter)
      .sort({
        dueDate: 1
      });


    res.json(tasks);


  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

};



// Update Task
const updateTask = async (req,res)=>{

  try {

    const task = await Task.findById(req.params.id);


    if(!task){

      return res.status(404).json({
        message:"Task Not Found"
      });

    }


    if(task.createdBy.toString() !== req.user.id){

      return res.status(401).json({
        message:"Unauthorized"
      });

    }



    task.title = req.body.title ?? task.title;

    task.description =
      req.body.description ?? task.description;


    task.category =
      req.body.category ?? task.category;


    task.priority =
      req.body.priority ?? task.priority;


    task.dueDate =
      req.body.dueDate ?? task.dueDate;


    task.completed =
      req.body.completed ?? task.completed;



    await task.save();


    res.json(task);



  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};




// Delete Task
const deleteTask = async(req,res)=>{

  try {


    const task = await Task.findById(req.params.id);



    if(!task){

      return res.status(404).json({
        message:"Task Not Found"
      });

    }



    if(task.createdBy.toString() !== req.user.id){

      return res.status(401).json({
        message:"Unauthorized"
      });

    }



    await task.deleteOne();



    res.json({

      message:"Task Deleted"

    });



  } catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};
 
// Dashboard Statistics
const getTaskStats = async (req, res) => {
  try {

    const total = await Task.countDocuments({
      createdBy: req.user.id
    });


    const completed = await Task.countDocuments({
      createdBy: req.user.id,
      completed: true
    });


    const pending = await Task.countDocuments({
      createdBy: req.user.id,
      completed: false
    });


    const highPriority = await Task.countDocuments({
      createdBy: req.user.id,
      priority: "High"
    });


    res.json({
      total,
      completed,
      pending,
      highPriority
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


module.exports = {

  addTask,

  getTasks,

  updateTask,

  deleteTask,

  getTaskStats

};