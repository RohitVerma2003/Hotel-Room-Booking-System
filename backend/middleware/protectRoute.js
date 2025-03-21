import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message: "Access Denied. No token provided."});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Access Denied. Invalid token."});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message: "Access Denied. User not found."});
        }

        req.user = user;
        next();
    }catch(err){
        console.log("Error in protected route middleware: " , err.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export default protectRoute;