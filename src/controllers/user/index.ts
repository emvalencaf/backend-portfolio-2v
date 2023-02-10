// express
import { Request, Response } from "express";
import generateToken from "../../auth/generateToken";

// repository
import UserRepository from "../../repository/user";
import { FindUserParams } from "../../shared-type/user";

// type

export default class UserController{
    // register a new user and sign in
    static async register(req: Request, res: Response) {
      
        if(!req.body) return res.status(400).send({ message: "Error 400: bad request you've sent a empety data" });

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

        //if (await UserController.findOneUser(null, null, { email: email })) return res.status(409).send({
        //    message:"Error 409: the email sent already is registered"
        //});

        // if (await UserController.findOneUser(null, null, { username: username })) return res.status(409).send({
        //    message:"Error 409: the username sent already is registered"
        // });

        const userFind = await UserController.findUser({
            email,
            username,
        });

        console.log(userFind);
        
        if (!!userFind) return res.status(409).send({
            message: "Error 409: the email or username sent already is registered"
        });

        const newUser = {
            username: username.toString(),
            email: email.toString(),
            password: password.toString(),
        };

        try{
            
            const data = await UserRepository.register(newUser);

            if (data) {

                const token = generateToken(data._id.toString());
                res.status(201).json(token);
            };

        }catch(e) {
            
            res.status(500).send({
                message:"error 500: internal error in our server"
            });

            console.log("[server]: Error 500", e);
        }

    };

    static async getById(req: Request, res: Response) {

        if (req.params.id) res.status(400).send({
            message: "error 400: bad request you must sent an id"
        });

        if (!req.params.id.match(
            /^[a-fA-F0-9]{24}$/
            )) res.status(500).send({
                message:"error 400: bad request you must sent a valid id"
            })

        try {

            return await UserRepository.getById(req.params.id);

        }catch(err) {
            
            console.log(`[server]: user's id ${req.params.id} not found it`);

            res.status(404).send({
                message: "error 404: user not found it",
            });
        }

    }

    static async findUser({ email, username }: FindUserParams) {

        try {
            
            return await UserRepository.findUser({
                email,
                username
            });

        } catch(err) {
            
            console.log("[server]: error:", err);
            
            return null;
        }
    }
}