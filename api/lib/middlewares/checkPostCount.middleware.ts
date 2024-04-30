import { config } from "../config";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const checkPostCount: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const {num} = req.params;
    const parsedValue = parseInt(num, 10);
    if(isNaN(parsedValue) || parsedValue >= config.supportedPostCount) return res.status(400).send('Invalid or no value!');
    next();
}