import "dotenv/config"
import express from "express"
import './config/connection.js'

import userRoutes from './routes/usersRoutes.js'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`))