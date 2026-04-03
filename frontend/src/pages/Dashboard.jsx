import { useEffect, useState } from "react";


function Dashboard(){
    const {user} = useUser();

    const [projects, setProjects] = useState([]);
    const[Loading, setloading] = useState(true);

    //fetch Projects
const fetchProject = async () => {
    try{
        const res = await API.get("/projects");
        setProjects(res.data);
    }catch(err){
        console.log(err);
    }finally{
        setloading(false);
    }
};

useEffect(() => {
    fetchProject();
},[]);

    return(
        <div style={styles.container}>

            {/* header */}
            <h1 style={styles.heading}>Welcome, {user?.username || "User"}</h1>

            {/* stats section */}

            <div>
                <div>
                    <h2>{projects.length}</h2>
                    <p>Total Projects</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;