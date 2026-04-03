import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../clients/api";
import Task from "./Task";

function ProjectPage() {
  const { id } = useParams(); ///project ID from URL

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // 🔹 Fetch project
  const fetchProject = async () => {
    try {
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/projects/${id}/tasks`);
      console.log("TASKS:", res.data);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //  Load data
  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  //handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/projects/${id}/tasks`, form);

      setForm({ title: "", description: "" });

      fetchTasks(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  //handle delete task
  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/projects/${id}/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      {/* Tasks will go here */}
      <h2>Tasks</h2>

      {/* 🔹 Create Task Form */}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button>Add Task</button>
      </form>

      {/* Display TAsk */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
         
            <Task
              key={task._id}
              task={task}
              projectId={id}
              refreshTasks={fetchTasks}
            />
            
            // <h4>{task.title}</h4>
            // <p>{task.description}</p>
            // <p>Status: {task.status}</p>

            // <button onClick={() => handleDelete(task._id)}>Delete</button>
          
        ))
      )}
    </div>
  );
}

export default ProjectPage;
