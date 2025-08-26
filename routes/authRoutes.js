import login from "../controllers/auth/loginController.js";
import {signUp} from "../controllers/auth/signupController.js";
import { Router } from "express";
const authRoutes = Router();

authRoutes.post("/register", signUp);
authRoutes.post("/login", login);

export default authRoutes