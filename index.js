import dotenv from 'dotenv';
import express from 'express';
import cors from  'cors';
import ConnectDB from './Databse/ConnectDB.js';
import userRoutes from './router/userRoutes.js';
// import paymentRoute from './router/paymentRoute.js';
import path from 'path';
import { fileURLToPath } from "url";
// import paymentRoute from './router/paymentRoute.js';


dotenv.config();
ConnectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();

app.use(express.json());
app.use(cors({
  origin: ["https://accpcops.org.in", "http://localhost:3000","http://localhost:5173","https://admin.accpcops.org.in"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));
// app.use(cors({
//   origin:"*"
// }));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use("/api/user", userRoutes);
// app.use("/api/payment",paymentRoute);
// app.use("/api/payment", paymentRoute);

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})