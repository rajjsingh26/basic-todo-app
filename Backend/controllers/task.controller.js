const Task = require('../models/task.model.js');

exports.createTask = async(req,res,next) =>{
    try {
        const {name, description,} = req.body;

        if(!name){
            return res.status(400).json({
                message: "Please provide task name."
            })
        }

        const task = await Task.create({
            name, 
            description,
            user: req.user._id
        })

        res.status(200).json({
            success: true,
            task
        })

    } catch (error) {
        console.log(error)
        return new Error("Something Went Wrong!")
    }
}

exports.getAllTaskForSingleUser = async (req,res,next) =>{
    try {
        const userId = req.params.id;

        const tasks = await Task.find({user: userId});

        res.status(200).json({
            tasks
        })

    } catch (error) {
        console.log(error)
        return new Error("Something Went Wrong!")
    }
}

exports.deleteSingleTask = async (req,res,next) =>{
    try {
        const taskId = req.params.id;
        
        await Task.findByIdAndDelete({_id: taskId});

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully!"
        })

    } catch (error) {
        console.log(error)
        return new Error("Something Went Wrong!")
    }
}

exports.markAsDone = async (req,res,next) =>{
    try {
        const taskId = req.params.id;
        
        await Task.findByIdAndUpdate(taskId, req.body);

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully!"
        })

    } catch (error) {
        console.log(error)
        return new Error("Something Went Wrong!")
    }
}

exports.updateSingleTask = async (req,res,next) =>{
    try {
        const taskId = req.params.id;
        
        await Task.findByIdAndUpdate(taskId, req.body);

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully!"
        })

    } catch (error) {
        console.log(error)
        return new Error("Something Went Wrong!")
    }
}