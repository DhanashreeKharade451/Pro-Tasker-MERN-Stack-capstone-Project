import { useState,useEffect } from "react";
import API from "../clients/api"
import { Link, useNavigate
    
 } from "react-router-dom";

function Projects(){
    const [Projects, setProjects] = useState([]);
    const[form, setForm] =useState({
        name: "",
    description: "",
    }) ;

    //Fetch all projects
    const fetchProjects = async() => {
        try{
            const res = await API.get("/projects");
             setProjects(res.data);
        }catch (err) {
      console.log({message: err.message});
    }
};

 useEffect(() => {
    fetchProjects();
  }, []);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

   // 🔹 Create project
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/projects", form);
      setForm({ name: "", description: "" });
      fetchProjects(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

   // 🔹 Delete project
  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return(
<div>
    <h1>Projects</h1>

    {/* create Project Form */}
    <form onSubmit={handleSubmit}>
        <input
        name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange} />

        <input
         name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange} 
          />
          <button> Create Project</button>
    </form>

    {/* ✅ Display Projects */}
    {Projects.map((p) => (
        <div key = {p._id}>
            <h3>
                <Link to ={`/projects/${p._id}`}>{p.name}</Link>

            </h3>
            <p>{p.description}</p>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
            
        </div>
    ))}

</div>

  );

}

export default Projects;