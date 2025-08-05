import express from "express";
import morgan from "morgan";
import dbConnect from "./src/shared/config/dbConnect.config.js";
import "./src/shared/config/env.config.js"
import argvsConfig from "./src/shared/config/argvs.config.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import indexRouter from "./src/routes/index.router.js";
import { startBirthdayReminderJob } from "./src/shared/jobs/birthdayReminder.job.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import pathHandler from "./src/shared/middlewares/pathHandler.mid.js";
import errorHandler from "./src/shared/middlewares/errorHandler.mid.js";
/*Server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
    console.log(`Server is running on port ${port} and mode ${argvsConfig.mode}`);
    await dbConnect(process.env.DB_LINK);
};
server.listen(port,ready);
/*Engine settings */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
/*Middlewares settings */
server.use(cors({
    origin: [
        'http://localhost:5173',
        'https://app-cumple-front.vercel.app' // Sin barra al final y con HTTPS
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
}))
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(cookieParser())
/*Router settings */
server.use("/",indexRouter);
server.use(pathHandler);
server.use(errorHandler);
/* Jobs */
// startBirthdayReminderJob();
