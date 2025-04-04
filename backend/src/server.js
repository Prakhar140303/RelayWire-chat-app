import dotenv from 'dotenv'
import express from 'express';
import {connectDB} from './lib/db.js'
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true,
}))
const PORT = process.env.PORT || 5001;
connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.listen(PORT ,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})