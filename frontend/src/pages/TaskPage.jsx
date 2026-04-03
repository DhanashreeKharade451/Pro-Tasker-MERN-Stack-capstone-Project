import { useParams } from "react-router-dom";

function TaskPage() {
  const { id } = useParams();

  return <h1>Task Page for ID: {id}</h1>;
}

export default TaskPage;