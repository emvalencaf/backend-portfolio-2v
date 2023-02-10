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

        if (await UserController.findOneUser(null, null, { email: email })) return res.status(409).send({
            message:"Error 409: the email sent already is registered"
        });

        if (await UserController.findOneUser(null, null, { username: username })) return res.status(409).send({
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

    static async findUserById(req: Request, res: Response) {
        return UserController.findOneUser(req, res, {
            email: undefined,
            username: undefined,
            _id: undefined
        });
    }

    static async findOneUser(req: Request | null, res: Response | null,{ email, username, _id }: FindUserParams) {

        if (req && res) {

            const data = await UserRepository.findOneUser({
                _id: req.params.id,
                email: req.params.email,
                username: req.params.username,
            });

            if (!data) return res?.status(404).send({
                message: "error 404: not found"
            });

            return res.status(200).send(data);

        };

        if (
            !email ||
            !username ||
            !_id !!
        ) return;

        return await UserRepository.findOneUser({
            email,
            username,
            _id,
        });
    }
}