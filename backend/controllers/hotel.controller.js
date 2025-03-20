import Room from "../models/room.model.js";
import getRoomPrice from "../utils/getRoomPrice.js";

export const checkAvailability = async (req, res) => {
    try {
        const { date } = req.body;
        const rooms = await Room.find({ date });
        const roomPrice = getRoomPrice(rooms);

        res.status(201).json({
            roomsAvailable: 50 - rooms.length,
            roomPrice: roomPrice,
            date: date
        });
    } catch (err) {
        console.log("Error in Checking Availability", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const bookRooms = async (req, res) => {
    try {
        const { date, price } = (req.body);
        const rooms = await Room.find({ date }).sort({ roomNumber: 1 });
        const lastRoomNumber = Number(rooms[rooms.length - 1]?.roomNumber) || 0;

        const room = new Room({ roomNumber: lastRoomNumber + 1, bookedBy: req.user._id, date: date, price: price });
        await room.save();

        res.status(201).json({
            roomData: room,
            message: "Room Booked Successfully"
        })
    } catch (err) {
        console.log("Error in Checking Availability", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteRoomBooking = async (req, res) => {
    try {
        const { id } = req.body;

        const room = await Room.findByIdAndDelete({ _id: id }).populate("bookedBy");
        const rooms = await Room.find().populate("bookedBy");

        res.status(201).json({
            rooms: rooms,
            deletedRoom : room,
            message: "Room Booking Deleted Successfully"
        })
    } catch (err) {
        console.log("Error in Deletion Booking", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}