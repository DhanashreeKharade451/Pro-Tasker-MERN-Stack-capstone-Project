import "dotenv/config"
import express from "express"
import './config/connection.js'

import userRoutes from './routes/usersRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

import cors from "cors";


const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({origin: [process.env.CLIENT_ORIGIN, 'http://localhost:5173' ]}));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes)
app.use("/api/projects", taskRoutes)

app.get('/', (req, res) =>{
    res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`))