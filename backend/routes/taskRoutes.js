import express from express;
import Task from '..models/Task.js'
import { authMiddleware } from '../utils/auth';
import Project from '../models/Project.js';

const router = express.Router();

router.use(authMiddleware);

//POST /api/projects/:projectId/tasks    --- create a task
router.post('/:projectId/task', async (req, res) => {
   try{
     const project = await Project.findOne({_id: req.params.projectId});
        if(!project){
             return req.status(404).json({ message: "Project not found" });
        }

        if(project.user.toString() !== req.user_id){
            res.status(403).json({message : 'User is not authorize to create a task'})
        }

        const newTask = await Task.create({...req.body, project: req.params.projectId});
                res.status(201).json(newTask);
   }catch(err){
     res.status(400).json({ message: err.message });
   }
        
})