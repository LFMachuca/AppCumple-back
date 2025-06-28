import { Router } from "express";
import { readAllService } from "../modules/events/events.service.js";
import createLink from "../shared/utils/createLink.util.js";

const viewsRouter = Router();
const indexView = (req,res,next) =>{
    res.render("index");
}
const registerView = (req,res,next) =>{
    res.render("register");
}
const eventsView = async (req,res) =>{
    const events = await readAllService();
    res.status(200).render("user-dashboard",{events})
}
const eventCreateView = (req, res, next)=>{
    res.status(200).render("create-event");
}
const linkView = async (req, res) =>{
    const { event_id }= req.cookies.event;
    console.log(event_id);
    const link = createLink(event_id);
    res.status(200).render("invitation-link", {link})
}
const confirmView = async (req,res) =>{
    const {eventId} = req.params
    res.status(200).render("confirm-invitation", {eventId})
}
viewsRouter.get("/", indexView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/eventsList", eventsView)
viewsRouter.get("/event/create", eventCreateView)
viewsRouter.get("/event/link", linkView)
viewsRouter.get("/event/confirm/:eventId", confirmView)
export default viewsRouter;