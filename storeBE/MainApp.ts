import express, { Application, Request, Response,  NextFunction } from "express"
import cors from "cors"
import { HTTP, mainError } from "./error/mainError"
import store from "./router/storeRouter"

export const mainApp = (app: Application) => {
    app.use(
        cors({
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
        })
    )

    app.use(express.json())
    app.use("/api/v1", store)

    app.all("*", (req: Request, res: Response, next: NextFunction)=>{
        next(
            new mainError({
                name: "Route Error",
                message: `Route Error due to ${req.originalUrl} doesn't exist`,
                status: HTTP.BAD_REQUEST,
                success: false,
            })
        )
    })
}