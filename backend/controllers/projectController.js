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
