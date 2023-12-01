
import express from "express";
// import mongoose from "mongoose";
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";
import { Client } from "pg";

export async function getClient() {
    const postgressLink:string|undefined = process.env.POSTGRESS_CONNECT_KEY
    const client = new Client(postgressLink);
    await client.connect()
    console.log("connected")
    return client
}

getClient()
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

