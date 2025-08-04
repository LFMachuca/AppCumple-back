import { Router } from "express";
import adminsRouter from "../modules/admin/admin.router.js"
import authRouter from "../modules/auth/auth.router.js";
import eventsRouter from "../modules/events/events.router.js";
import guestRouter from "../modules/guests/guest.router.js";
const indexRouter = Router();

indexRouter.use("/admin", adminsRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/events", eventsRouter);
indexRouter.use("/guest", guestRouter);

export default indexRouter;