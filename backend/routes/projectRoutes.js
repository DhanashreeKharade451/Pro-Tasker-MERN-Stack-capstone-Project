import express from 'express';
import Project from "../models/Project.js"
import { authMiddleware } from '../utils/auth.js';
import taskRoutes from '../routes/taskRoutes.js'

import{
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js"

const router = express.Router();

// Apply auth to all routes
router.use(authMiddleware);


// router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);


// Nested routes
router.use("/:projectId/tasks", taskRoutes);

//POST /api/projects--- create a new project

router.post("/", authMiddleware, async (req, res) => {
    try{
        const newProject = await Project.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json(newProject);

    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//GET /api/projects  --- get all projects for the valid user

router.get("/", authMiddleware, async(req,res) => {
    try {
    const projects = await Project.find({ user: req.user._id }).populate(
      "user",
    );
    res.status(200).json(projects);
  } catch(error) {

     res.status(500).json({ message: error.message });
  }
});

//GET /api/projects/:id --- get a single project

router.get("/:id", authMiddleware, async (req,res) => {
    try{
        const project = await Project.findById({
        _id: req.params.id, 
        user: req.user._id,
        });

       if (!project) {
     return res.status(404).json({ message: `Project with ${req.params.id} is not found` });
    }
    res.status(200).json(project); 
    }catch(err){
         res.status(400).json({ message: err.message  });
    }
})

//PUT /api/projects/:id  -- update a project

router.put("/:id", authMiddleware, async(req,res) => {
    try{
        const project = await Project.findById(req.params.id);

         if (!project) {
     return res.status(404).json({ message: "Project not found" });
    }
if(project.user.toString() !== req.user._id){
     return res.status(403).json({ message: "user is not authorized to updatete this project" });
}

const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
      req.body,
      { new: true },
  );
  res.status(201).json(updatedProject);
    }catch{
 res.status(500).json(error);
    }
});

//DELETE /api/projects/:id-------------- delete a project and it's tasks
router.delete("/:id", authMiddleware, async (req,res) => {
    try{
 const project = await Project.findById(req.params.id);

    if (!project) {
     return res.status(404).json({ message: "Project not found" });
    }

    if(project.user.toString() !== req.user._id){
     return res.status(403).json({ message: "user is not authorized to delete this project" });
}

 // Delete the project
const deletedProject = await Project.findByIdAndDelete(req.params.id );

    // Delete all tasks linked to this project
  const deletedTasks = await Task.deleteMany({ project: req.params.id});
  
   res.status(201).json(deletedProject, deletedTasks);
  
    }catch(err){
 res.status(500).json({message: err.message});
    }
})

export default router;