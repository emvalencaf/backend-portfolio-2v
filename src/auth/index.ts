import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// UserController
import UserController from "../controllers/user";

// enviroment variables
const jwtSecret = process.env.JWT_SECRET || "";


export default class Auth{
    // get a token by an id
    static generateToken(id: string){
        return jwt.sign(
            { id },
            jwtSecret,
            {
                expiresIn: "7d",
            },
        );
    }

    // get an id or empety string from a token
    static verifyToken(token: string) {

        return jwt.verify(token, jwtSecret);

    }

    // verifies a token and 
    static async authGuard(req: Request, res: Response, next: NextFunction) {

        // get token from the headers request
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        // check if header has a token
        if (!token) return res.status(403).json({
            message: "error 403: forbidden access"
        });

        // check if token is valid
        
        try {
            const verified = Auth.verifyToken(token);

            if (typeof verified !== "string") throw Error();

            const user = await UserController.getById(req, res, verified);

            req.user = {
                id: user?._id.toString() || "",
                name: user?.name || "",
                email: user?.email || "",
            };

            next();

        } catch(err) {

            console.log("[server]: error", err);

            res.status(403).json({
                message: "error 403: forbidden access this token is invalid"
            });

        }
    }
}