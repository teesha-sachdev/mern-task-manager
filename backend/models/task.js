const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(

  {

    title: {
      type: String,
      required: true,
      trim: true,
    },


    description: {
      type: String,
      default: "",
      trim: true,
    },


    completed: {
      type: Boolean,
      default: false,
    },


    dueDate: {
      type: Date,
      default: null,
    },


    category: {
      type: String,
      enum: [
        "Study",
        "Work",
        "Personal",
        "Shopping"
      ],
      default: "Personal",
    },


    priority: {
      type: String,
      enum: [
        "High",
        "Medium",
        "Low"
      ],
      default: "Medium",
    },


    createdBy: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },


  },

  {

    timestamps: true,

  }

);


module.exports = mongoose.model("Task", taskSchema);