import dotenv from 'dotenv';
import express from 'express'
import connectToMongoDB from './db/connecttoMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import hotelRoutes from './routes/hotel.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

const PORT = 5000;

app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log("listening on port ", PORT);
});
