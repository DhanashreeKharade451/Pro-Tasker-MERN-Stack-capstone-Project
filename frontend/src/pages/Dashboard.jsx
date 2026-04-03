import { useEffect, useState } from "react";
import API from "../clients/api";
import { useUser } from "../context/UserContext";
import { Link, redirect } from "react-router-dom";

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
            <div
              key={p._id}
              style={styles.projectCard}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3>{p.name}</h3>
              <p>{p.description}</p>
               <p>
    <span style={styles.badge}>To Do: {p.tasks?.filter(t => t.status === "TO Do").length}</span>
    <span style={styles.badge}>In Progress: {p.tasks?.filter(t => t.status === "In Progress").length}</span>
    <span style={styles.badge}>Done: {p.tasks?.filter(t => t.status === "Done").length}</span>
  </p>

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
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "10vh",
    marginTop: "5vh",
    fontSize: "30px",
    fontWeight: "600",
  },

  statsContainer: {
    display: "flex",
    gap: "35px",
    marginBottom: "30px",
  flexWrap: "wrap", // allows wrapping on smaller screens
  },

  card: {
    background: "#b5c8ec",
    padding: "15px",
    flex: 1,
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 12, 12, 0.08)",
    textAlign: "center",
    transition: "transform 0.2s",
  },

  projectSection: {
    marginTop: "20px",
    display: "flex",
     flexDirection: "column",
     gap: "20px",
 marginTop: "5vh",
     marginBottom: "5vh"
  },

  projectCard: {
    background: "#a9ceb5",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(224, 18, 18, 0.06)",
    transition: "transform 0.2s ease",
  },

  button: {
    color: "#06067c",
    textDecoration: "none",
    fontWeight: "1000",
  },

  mainButton: {
    background: "#040952",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    display: "inline-block",
  },
};
