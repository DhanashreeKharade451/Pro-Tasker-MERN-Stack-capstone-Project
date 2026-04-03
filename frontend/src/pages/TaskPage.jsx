import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TaskPage() {
  const { id } = useParams();
  const [task,setTasks] = useState(null);

  useEffect(()=>{
    const fetchTasks = async () => {
      try{
        const res = await API.get(`/tasks/${id}`);
        setTasks(res.data);
      }catch(err){
        console.log(err)
      }
    };
    fetchTasks();
  }, [id]);

   if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h1>{task.title}</h1>
       <p>{task.description}</p>
      <p>Status: {task.status}</p>
    </div>
  );
}

export default TaskPage;