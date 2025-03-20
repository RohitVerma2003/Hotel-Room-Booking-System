import express from 'express';
import { bookRooms, checkAvailability, deleteRoomBooking } from '../controllers/hotel.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/checkAvailability" , checkAvailability);
router.post("/bookRoom" , protectRoute , bookRooms);
router.post("/bookRoomDelete" , deleteRoomBooking);

export default router;