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


  const getMainStatus = (tasks) => {
  if (!tasks || tasks.length === 0) return "No Tasks";

  const count = {
    "To Do": 0,
    "In Progress": 0,
    "Done": 0,
  };

  tasks.forEach((t) => {
    count[t.status] = (count[t.status] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
};
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
            {console.log(projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0))}
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
  <span style={styles.badge}>
    {getMainStatus(p.tasks)}
  </span>
</p>
              
              {/* <p>
  <span style={styles.badge}>
    {p.tasks && p.tasks.length > 0
      ? p.tasks[0].status
      : "No Tasks"}
  </span>
</p> */}

              <Link to={`/projects/${p._id}`} style={styles.button}>
                View Project
              </Link>
            </div>
          ))
        )}
      </div>

      {/* CTA */}

      <div style={{ marginTop: "20px" }}>
        <Link
          to="/projects"
          style={styles.mainButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
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
     justifyContent: "space-between",
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
     flexWrap: "wrap",
  },

  projectCard: {
    background: "#a9ceb5",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
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

  badge: {
    display: "inline-block",
    marginRight: "8px",
     marginBottom: "5px",
    padding: "4px 8px",
    borderRadius: "6px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontSize: "12px",
  },
};
