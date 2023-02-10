// express
import { Request, Response } from "express";

// repository
import UserRepository from "../repository/user";

// type
import { FindUserParams } from "../shared-type/user";

export default class UserController{
    static async register(req: Request, res: Response) {
        
        if(!req.body) return res.status(400).send({ message: "Error 400: bad request you've send a empety data" });

        const { username, password, email } = req.body;

        if (
            !username ||
            !password ||
            !email
        ) return res.status(400).send({
            message:"Error 400: bad request you've send a required field empety"
        });

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return res.status(400).send({
            message: "Error 400: bad request you've send a invality email"
        });

        if (await UserController.findOneUser({ email: email })) return res.status(409).send({
            message:"Error 409: the email sent already is registered"
        });

        if (await UserController.findOneUser({ username: username })) return res.status(409).send({
            message:"Error 409: the username sent already is registered"
        });

        const newUser = {
            username: username.toString(),
            email: email.toString(),
            password: password.toString(),
        };

        try{
            
            const data = await UserRepository.register(newUser);

            res.status(201).send(data);

        }catch(e) {
            
            res.status(500).send({
                message:"error 500: internal error in our server"
            });

            console.log("[Servidor]: Error 500", e);
        }

    };

    static async findOneUser({ email, username, _id }: FindUserParams) {

        if (
            !email ||
            !username ||
            !_id !!
        ) return null;

        return await UserRepository.findOneUser({
            email,
            username,
            _id,
        });
    }
}