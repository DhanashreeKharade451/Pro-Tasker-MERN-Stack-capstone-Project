import "dotenv/config"
import express from "express"
import './config/connection.js'

import userRoutes from './routes/usersRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes)

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`))