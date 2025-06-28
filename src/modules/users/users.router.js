import { Router } from "express";
import {registerUser, getUsers, getUserById} from "./users.controller.js"

const usersRouter = Router();

usersRouter.post("/", registerUser ); //ready
usersRouter.get("/", getUsers); //ready
usersRouter.get("/:id", getUserById); //ready

export default usersRouter;