import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validateRegistration } from "../validators/registrationValidators";

const authRouter = Router();

authRouter.post("/register", validateRegistration,register);
authRouter.post("/login", login);

export default authRouter;