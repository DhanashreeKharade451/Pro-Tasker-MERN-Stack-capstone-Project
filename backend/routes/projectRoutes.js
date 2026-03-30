import express from 'express';
import Project from "../models/Project.js"
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

//POST /api/projects--- create a new project

router.post("/", async (req, res) => {
    try{
        const newProject = 

    }catch(err){
        res.status(400).json({message: err.message});
    }
});