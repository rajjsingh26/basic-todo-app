const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type:String,
        default: "In Progress"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.model("Task",taskSchema);