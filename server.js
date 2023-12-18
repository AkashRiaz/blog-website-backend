import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler, invalidPathHandler } from './middleware/errorHandler.js';

dotenv.config();
connectDB()
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.send("server is ready")
})

app.use("/api/users", userRouter)

app.use(invalidPathHandler)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})
