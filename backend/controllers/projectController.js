import { request } from "express";
import Project from "../models/Project.js"
import Task from "../models/Task.js";

//create project:
export const createProject = async(req, res) =>{
    try{
        const newProject = await Project.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json(newProject);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

//Get all projects for all user
export const getProjects = async(req, res) => {
    try{
        const projects = await Project.find({user: req.user._id}).populate("user");
        res.status(200).json(projects);
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

// GET single project

export const getProject = async (req,res) => {
    try{
        const project = await Project.findOne({
            _id: req.param.id,
            user:request.user.id,
        });

        if (!project) return res.status(400).json({message:"project not found"});
        res.status(200).json(project);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

//update project

export const updateProject = async (req,res) => {
    try{
        const project = await Project.findById(req.param.id);
        if (!project) return res.status(404).json({message: "Project not found"});

        if(project.user.toString() !== req.user._id)
            return res.status(403).json({message:"Not authorized"});

        const updatedProject =await Project.findByIdAndUpdate(req.param.id, req.body, {
            new:true
        });
        res.status(200).json(updateProject);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};


//Delete project and its tasks
export const deleteProject = async (req, res) => {
    try{
        const project = await Project.findById(req.param.id);
        
        if(!Project) return res.status(404).json({Message: "Project no found"});

        if(project.user.toString() !== res.user._id)
          return res.status(403).json({ message: "Not authorized" });

        await Project.findByIdAndDelete(req.param.id);
        await Task.deleteMany({project: req.param.id});

         res.status(200).json({ message: "Project and tasks deleted" });
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
