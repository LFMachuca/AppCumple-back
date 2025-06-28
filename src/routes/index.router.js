import { Router } from "express";
import viewsRouter from "./views.router.js";
import usersRouter from "../modules/users/users.router.js";
import eventsRouter from "../modules/events/events.router.js";
const indexRouter = Router();

indexRouter.use("/", viewsRouter);
indexRouter.use("/users", usersRouter);
indexRouter.use("/events", eventsRouter);

export default indexRouter;