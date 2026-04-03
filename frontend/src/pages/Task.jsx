import API from "../clients/api";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

function Task({task, projectId, refreshTasks}){

     const [Tasks,setTasks] = useState()

    //Handle status change.......update status
    const handleStatusChange = async (e) =>{
        try{
            await API.put(
                `/projects/${projectId}/tasks/${task._id}`,
                {status: e.target.value}
            );
            refreshTasks();
        }catch(err){
            console.log(err);
        }
    };

     const fetchTasks = async () => {
  try {
    const res = await API.get("/projects"); // get all projects first

    let allTasks = [];

    // loop each project and get tasks
    for (let project of res.data) {
      const taskRes = await API.get(`/projects/${project._id}/tasks`);
      console.log('fetchTasks')
      allTasks = [...allTasks, ...taskRes.data];
    }

    setTasks(allTasks);
  } catch (err) {
    console.log(err);
  }
};

    useEffect(() => {
        fetchTasks();
      }, []);
    

    //Handle delete task

    const handleDelete = async() =>  {
        try{
            await API.delete(`/projects/${projectId}/tasks/${task._id}`);
            refreshTasks();  //refreshe list after delete
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        {/* status dropdown */}
        <select value={task.status} onChange={handleStatusChange}>
            <option>TO Do</option>
            <option>In Progress</option>
            <option>Done</option>
        </select>
        <br /><br />
        <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Task;