import express from "express";
import morgan from "morgan";
import dbConnect from "./src/shared/config/dbConnect.config.js";
import "dotenv/config.js"
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import indexRouter from "./src/routes/index.router.js";
import { startBirthdayReminderJob } from "./src/shared/jobs/birthdayReminder.job.js";
import cookieParser from "cookie-parser";
import cors from "cors"
/*Server settings */
const server = express();
const port = process.env.PORT || 8000;
const ready = async () => {
    console.log("Server is running on port 8000");
    await dbConnect(process.env.DB_LINK);
};
server.listen(port,ready);
/*Engine settings */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
/*Middlewares settings */
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(cookieParser())
server.use(cors({
    origin: '*'
}))
/*Router settings */
server.use("/",indexRouter);

/* Jobs */
// startBirthdayReminderJob();
