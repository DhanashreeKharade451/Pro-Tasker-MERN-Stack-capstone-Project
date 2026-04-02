import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../clients/api"

function ProjectPage(){
    const{id} =useParams(); ///project ID from URL

    const [project, setProject] = useState(null);
    const [task, setTasks] = useState([]);
    const[form, setForm] = useState({
        title: "",
        description:"",
    });

    const fetchProject = async () => {
        try {
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
    };

   useEffect(() => {
    fetchProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return(
      <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      {/* Tasks will go here */}
      <h2>Tasks</h2>
    </div>
  )

}

export default ProjectPage;