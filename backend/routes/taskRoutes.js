import express from 'express'
import Task from '../models/Task.js'
import { authMiddleware } from '../utils/auth.js';
import Project from '../models/Project.js';

import {
   createTask,
   getTask,
   updateTask,
   deleteTask,
} from "../controllers/taskController.js"

const router = express.Router({mergeParams: true});

//importent for nested routes
router.use(authMiddleware);

// POST /api/projects/:projectId/tasks
router.post("/", createTask);

// GET /api/projects/:projectId/tasks
router.get("/", getTask);

// PUT /api/tasks/:taskId
router.put("/:taskId", updateTask);

// DELETE /api/tasks/:taskId
router.delete("/:taskId", deleteTask);




//POST /api/projects/:projectId/tasks    --- create a task
router.post('/:projectId/tasks', async (req, res) => {
   try{
     const project = await Project.findOne({_id: req.params.projectId});
        if(!project){
             return req.status(404).json({ message: "Project not found" });
        }

        if(project.user.toString() !== req.user._id){
           return res.status(403).json({message : 'User is not authorize to create a task'})
        }

        const newTask = await Task.create({...req.body, project: req.params.projectId});
                res.status(201).json(newTask);
   }catch(err){
     res.status(400).json({ message: err.message });
   }
        
})

//GET /api/projects/:projectId/tasks      -- get all tasks
 router.get('/:projectId/tasks', async(req,res) =>{
    try{
        const tasks = await Task.find({
                    //user: req.user_id,
                    project: req.params.projectId,
                }).populate("project")
                res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message:err.message})
    }
 });

 //PUT /api/tasks/:taskId---------------Update a single task
 router.put('/:taskId', async(req, res) =>{
    try{
         const task = await Task.findOne({_id: req.params.taskId}).populate("project");
        
                if(!task){
                    return res.status(404).json({message: "Task not found"})
                }
        
                if (task.project.user.toString() !== req.user._id){
                    return res.status(403).json({message: 'User is not authorized to update the task'})
                }  
        
                const updateTask = await Task.findByIdAndUpdate(
                    req.params.taskId,
                    req.body,
                    {new: true},
                );
        
                res.status(201).json(updateTask);
    }catch(err){
 res.status(500).json({message: err.message});
    }
 });

 //DELETE /api/tasks/:taskId  ------------------Delete a single task.
 router.delete("/:taskId", async(req,res) => {
    try{
         const task = await Task.findOne({_id: req.params.taskId}).populate("project");
        
                 if(!task){
                    return res.status(404).json({message: "Task not found"})
                }
        
                if (task.project.user.toString() !== req.user._id){
                    return res.status(403).json({message: 'User is not authorized to delete the task'})
                }  
        
                const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
                res.status(200).json(deletedTask);           
        
    }catch(err){
        res.status(500).json({message: error.message});
    }
 })
 export default router;