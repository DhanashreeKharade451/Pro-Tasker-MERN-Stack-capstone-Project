import "dotenv/config"
import express from "express"
import './config/connection.js'

import userRoutes from './routes/usersRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

import cors from "cors";


const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes)
app.use("/api/projects", taskRoutes)

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`))