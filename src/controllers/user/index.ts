// express
import { Request, Response } from "express";

// auth
import Auth from "../../auth";

// repository
import UserRepository from "../../repository/user";
import { FindUserParams } from "../../shared-type/user";
import CryptPassword from "../../utils/CryptPassword";

// type

export default class UserController{

    // get current user
    static async getCurrentUser(req: Request, res: Response) {
        
        const user = req.user;
        const token = req.token;

        res.status(200).json({
            user: {
                ...user,
            },
            token: {
                ...token,
            },
        });

    }

    // change password of an user
    static async changePassword(req: Request, res: Response) {

        const { newPassword, password, email } = req.body;

        // frontend data validations
        if (!newPassword) return res.status(400).send({
            message: "error 400: bad request you must sent a new password"
        });

        if (!password) return res.status(400).send({
            message: "error 400: bad request you must sent the currently password"
        });

        if (!req.user) return res.status(403).send({
            message: "error 403: forbidden access you must be logged to change your password"
        });

        if (req.user.email !== email) return res.status(403).send({
            message: "error 403: forbidden access you can not changed a password of another account"
        });

        // get user's data by the authGuard
        const { id } = req.user;

        const user = await UserController.getById(res, id, true);

        if (!user) return res.status(404).send({
            message: "error 404: user not found"
        });
        
        // check password
        if (! await CryptPassword.comparePassword(password, user.password)) return res.status(400).send({
            message: "error 400: bad request you must confirm your currently password"
        });

        try{

            await UserRepository.updateUserData(user, {
                email: "",
                password: newPassword,
                name: "",
            });

            res.status(200).send({
                message: "a new user password was successfully saved"
            })

        } catch(err) {
            console.log(`[server]: error`, err);
            res.status(500).send({
                message: "error 500: internal error"
            });
        }

    }

    // register a new user and sign in
    static async register(req: Request, res: Response) {
      
        if(!req.body) return res.status(400).send({ message: "Error 400: bad request you've sent a empety data" });

        const { name, password, email } = req.body;

        if (
            !name ||
            !password ||
            !email
        ) return res.status(400).send({
            message:"Error 400: bad request you've send a required field empety"
        });

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return res.status(400).send({
            message: "Error 400: bad request you've send a invality email"
        });

        const userFind = await UserController.findUser({
            email,
            name,
        });

        if (!!userFind) return res.status(409).send({
            message: "Error 409: the email or username sent already is registered"
        });

        const newUser = {
            name: name.toString(),
            email: email.toString(),
            password: password.toString(),
        };

        try{
            
            const data = await UserRepository.register(newUser);

            if (data) {

                const token = Auth.generateToken(data._id.toString());
                res.status(201).json({
                    id: data._id,
                    jwt: token,
                    name: data.name,
                    email: data.email,
                });
            };

        }catch(e) {
            
            res.status(500).send({
                message:"error 500: internal error in our server"
            });
        }
    };
    // get an user by id
    static async getById(res: Response, id: string, showPassword: boolean = false) {
        
        if (!id) return false;

        try {

            return await UserRepository.getById(id, showPassword);

        }catch(err) {
            
            console.log(`[server]: user's id ${id} not found it`);

            res.status(404).send({
                message: "error 404: user not found it",
            });
        }
    }

    // get an user by params id
    static async getByParams(req: Request, res: Response) {
        
        const { id } = req.params;

        const user = await UserController.getById(res, id, false);

        res.status(200).send({
            user
        });

    }

    // get user projects
    static async getProjects(req: Request, res: Response) {

        if (!req.user) return res.status(500).send({
            message: "error 500: internal error"
        });

        const { id } = req.user;

        const user = await UserController.getById(res, id, false);

        if (!user) return false;

        const { projects } = user;

        res.status(200).send({
            projects,
        })
    };

    // log in an user
    static async login(req: Request, res: Response) {
        
        const { name, email, password } = req.body;

        if ( !name && !email ) return res.status(400).send({
            message: "error 400: bad request you must sent an email or name to login an user"
        });

        if ( !password ) return res.status(400).send({
            message: "error 400: bad request you must sent an password to login an user"
        });

        const user = await UserController.findUser({ name, email }, true);

        if (!user) return res.status(404).send({
            message: "error 404: there is no user with this name or email"
        });

        // compare password
        if (! await CryptPassword.comparePassword(password, user.password)) return res.status(400).send({
            message: "error 400: bad request you must sent a valid password"
        });

        // get token
        const token = Auth.generateToken(user._id.toString());

        // return user data
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            jwt: token,
        });
    }

    // find an user by email or name
    static async findUser({ email, name }: FindUserParams, showPassword: boolean = false) {

        try {
            
            return await UserRepository.findUser({
                email,
                name
            }, showPassword);

        } catch(err) {
            
            console.log("[server]: error:", err);
            
            return null;
        }
    }
}