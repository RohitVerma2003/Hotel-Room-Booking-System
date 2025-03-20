import mongoose from "mongoose";
import User from "./user.model.js";

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : User,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    price : {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;