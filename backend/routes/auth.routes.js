import express from 'express';
import { adminLogin, login, logout, signup } from '../controllers/auth.contoller.js';
const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , logout);
router.post("/admin/login" , adminLogin);

export default router;