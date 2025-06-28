import { Router } from "express";
import { createEvent, getUserEvents, updateEvent, getEventById, getEventAttendees, getEvents } from "./events.controller.js";

const eventsRouter = Router();

eventsRouter.post("/", createEvent);  // ready
eventsRouter.get("/", getEvents); // ready
eventsRouter.get("/:userId", getUserEvents);  // ready
eventsRouter.get("/:id/rsvp", getEventById) // ready
eventsRouter.put("/:id/confirm", updateEvent); //ready
eventsRouter.get("/:id/attendees", getEventAttendees ) // ready

export default eventsRouter;