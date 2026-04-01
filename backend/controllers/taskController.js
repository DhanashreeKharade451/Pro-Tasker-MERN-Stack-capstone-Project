import Task from "../models/Task.js";
import Project from "../models/Project.js";
 
//create task

export const createTask = async (req, res) => {
    try{
        const project = await Project.findById(req.params.ProjectId);

        if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.user.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

     const newTask = await Task.create({ ...req.body, project: req.params.projectId });
    res.status(201).json(newTask);

    }catch(err){
res.status(400).json({ message: err.message });
    }
};

//Get all tasks for all projects
export const getTask = async (req,res){
    try{
        const project = await Project.findById(req.params.projectId);
    if (!project || project.user.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    const tasks = await Task.find({ project: req.params.projectId });
    res.status(200).json(tasks);

    }catch(err){
         res.status(500).json({ message: err.message });
    }
};

//Update Task
export const updateTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.taskId).populate("project");
       if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.project.user.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req,body, {new: true})
    res.status(200).json(updatedTask);

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//Delete task

export const deleteTask = async (req,res) => {
    try{
        const task = await Task.findById(req.params.taskId).populate("project")

        if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.project.user.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ message: "Task deleted" });

    }catch(err){
        res.status(500).json({message: err.msg})
    }
}