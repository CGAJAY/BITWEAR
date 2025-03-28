import express, { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authRouter from "./auth";


const v1Router = express.Router();

v1Router.use('/auth', authRouter);

export default v1Router;