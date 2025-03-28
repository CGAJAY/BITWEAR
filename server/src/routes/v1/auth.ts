import express, { Express, Request, Response } from "express";
import { signup, login, verifyEmail } from "../../controllers/auth";
import { StatusCodes } from "http-status-codes";

const authRouter = express.Router();

authRouter.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'Auth routes home' });
    }
);

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/verifyEmail", verifyEmail);

export default authRouter;
