import { useEffect, useState } from "react";
import API from "../clients/api";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";


function Dashboard() {
  const { user } = useUser();

  const [projects, setProjects] = useState([]);
  const [Loading, setLoading] = useState(true);

  //fetch Projects
  const fetchProject = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  console.log("Projects:", projects);
  return (
    <div style={styles.container}>
      {/* header */}
      <h1 style={styles.heading}>Welcome, {user?.username || "User"}</h1>

      {/* stats section */}

      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h2>{projects.length}</h2>
          <p>Total Projects</p>
        </div>

        <div style={styles.card}>
          <h2>
            {projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0)}
          </h2>
          <p>Total Tasks</p>
        </div>
      </div>

      {/* Project Preview */}
      <div style={styles.projectSection}>
        <h2>Your Projects</h2>

        {Loading ? (
          <p>Loading ...</p>
        ) : projects.length === 0 ? (
          <p>No Projects yet</p>
        ) : (
          projects.slice(0, 5).map((p) => (
            <div key={p._id} style={styles.projectCard}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>

              <Link to={`/projects/${p._id}`} style={styles.button}>
                View Project
              </Link>
            </div>
          ))
        )}
      </div>

      {/* CTA */}

      <div style={{ marginTop: "20px" }}>
        <Link to="/projects" style={styles.mainButton}>
          Go to All Projects
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
  },

  card: {
    background: "#f4f4f4",
    padding: "15px",
    flex: 1,
  },

  projectSection: {
    marginTop: "20px",
  },

  projectCard: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  },

  button: {
    color: "blue",
  },

  mainButton: {
    background: "green",
    color: "white",
    padding: "10px",
    display: "inline-block",
  },
};