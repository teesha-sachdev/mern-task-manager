const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://TeeshaSachdev:Teesha%4017@cluster0.u1pxzij.mongodb.net/?appName=Cluster0");
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;