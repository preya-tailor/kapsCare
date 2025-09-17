import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './src/config/db';
import bodyParser from 'body-parser';
import cors from "cors";
import router from './src/routes';
import path from 'path';

dotenv.config();
const app = express();
connectDb();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", router);

export default app;

