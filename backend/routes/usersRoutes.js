import express from "express";
import User from '../models/Users.js'
import { signToken } from "../utils/auth.js";

const router = express.Router();

// POST /api/users/register - Create a new user

router.post("/register", async (req,res) => {
    try{
        console.log(req.body);

         const newUser = await User.create(req.body);
            console.log(newUser);

            const token = signToken(newUser);
                res.status(201).json({ token, newUser });
        
    }catch(err){
        res.status(400).json({ message: err.message });
    }
});