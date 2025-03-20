import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCokkie from "../utils/generateToken.js";
import Room from "../models/room.model.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ fullName, username, password: hashedPassword});

        if (newUser) {
            generateTokenAndSetCokkie(newUser._id , res);
            await newUser.save();

            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
            });
        } else {
            res.status(400).json({ error: 'Invalid User Data' });
        }
    } catch (err) {
        console.log("Error in Signup controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password} = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if (!user || !isPasswordCorrect) {
            console.log('Invalid Username or Password')
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        generateTokenAndSetCokkie(user._id , res);

        res.status(400).json({
            _id: user.id,
            fullName: user.fullName,
            username: user.username,
        })

    } catch (err) {
        console.log("Error in Login controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { username, password} = req.body;
        const user = username === "Admin"
        const isPasswordCorrect = password === "123";

        if (!user || !isPasswordCorrect) {
            console.log('Invalid Username or Password')
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        const rooms = await Room.find().populate("bookedBy");

        res.status(400).json({
            rooms : rooms
        })

    } catch (err) {
        console.log("Error in Admin Login controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie("jwt" , "" , {maxAge : 0});
        res.status(200).json({ message: "Logged Out Successfully" });
    }catch(err){
        console.log("Error in Logout controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}