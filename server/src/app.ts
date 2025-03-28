import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import v1Router from "./routes/v1/index";

const app: Express = express(); // Create an Express app

// middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies


// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: 'Silence is golden' });
    }
);

// api version 1 routes
app.use("/api/v1", v1Router);
  
// Handle undefined routes
app.use('*', (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
    }
);
  
export default app;