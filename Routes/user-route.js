import express from "express"
import { User_login, User_register } from "../Controller/user-controller.js";

const userRouter = express.Router();


userRouter.post("/login", User_login);
userRouter.post("/register", User_register);


export default userRouter;
