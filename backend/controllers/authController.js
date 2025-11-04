import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req,res)=>{
    try{
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) 
        return res.status(400).json({ message: "User already exists" });
        
        const hashPassword= await bcrypt.hash(password,10);

        const newUser= await User.create({
        name,
        email,
        password: hashPassword,
        role,
    });
    res.status(201).json({ message: "Signup successful", user: newUser });
    }
    catch(err){
        res.status(500).json({ error: err.message });

    }
}


export const login = async (req, res) =>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
        return res.status(404).json({ message: "User not found" });

        const isValid = await bcrypt.compare(password,user.password)
        if (!isValid)
        return res.status(401).json({ message: "Invalid credentials" });

        const token =jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
            
        )
        res.json({ message: "Login successful", token, user });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}