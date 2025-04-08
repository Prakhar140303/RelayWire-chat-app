import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import {connectDB} from './lib/db.js'
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import {app, server, io} from './lib/socket.js'
import path from "path";
import cors from 'cors';
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true,
}))
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
connectDB();
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
console.log(path.join(__dirname,"../frontend","dist","index.html"));

if(process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}
server.listen(PORT ,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})