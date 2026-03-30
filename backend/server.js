import "dotenv/config"
import express from "express"
import './config/connection.js'

import 

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`))