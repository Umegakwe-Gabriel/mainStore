import { NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./mainError";

const errorBuilder = (err: mainError, res: Response) => {
    res.status(HTTP.BAD_REQUEST).json({
        name: err.name,
        message: err.message,
        success: err.status,
        error: err,
    })
}

export const handleError = (err: mainError, req: Request, res: Response) => {
    errorBuilder(err, res);
}