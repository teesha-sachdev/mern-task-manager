const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats
} = require("../controllers/taskController");

router.post("/tasks", protect, addTask);

router.get("/tasks", protect, getTasks);

router.put("/tasks/:id", protect, updateTask);

router.delete("/tasks/:id", protect, deleteTask);

router.get("/stats", protect, getTaskStats);

module.exports = router;