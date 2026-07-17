require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./Routes/authRoutes");
const taskRoutes = require("./Routes/taskroutes");

const app = express();
console.log("MONGO_URI VALUE:", process.env.MONGO_URI);
connectDB();

app.use(
  cors({
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://task-manager-frontend-qwuc.onrender.com"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});