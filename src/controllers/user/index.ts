// express
import { Request, Response } from "express";

// auth
import Auth from "../../auth";

// repository
import UserRepository from "../../repository/user";
import { FindUserParams } from "../../shared-type/user";
import CryptPassword from "../../utils/CryptPassword";

// type

export default class UserController {

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
            message: "you must sent a new password"
        });

        if (!password) return res.status(400).send({
            message: "you must sent the currently password"
        });

        if (!req.user) return res.status(403).send({
            message: "forbidden access you must be logged to change your password"
        });

        if (req.user.email !== email) return res.status(403).send({
            message: "forbidden access you can not changed a password of another account"
        });

        // get user's data by the authGuard
        const { id } = req.user;

        const user = await UserController.getById(id, true);

        if (!user) return res.status(404).send({
            message: "user not found"
        });

        // check password
        if (! await CryptPassword.comparePassword(password, user.password)) return res.status(400).send({
            message: "you must confirm your currently password"
        });

        try {

            await UserRepository.updateUserData(user, {
                email: "",
                password: newPassword,
                name: "",
            });

            res.status(200).send({
                message: "a new user password was successfully saved"
            });

            return;

        } catch (err) {
            console.log(`[server]: error`, err);
            res.status(500).send({
                message: "internal error"
            });
            return;
        }

    }

    // register a new user and sign in
    static async register(req: Request, res: Response) {

        if (!req.body) return res.status(400).send({ message: "you've sent a empety data" });

        const { name, password, email } = req.body;
        console.log("in register method");
        if (
            !name ||
            !password ||
            !email
        ) return res.status(400).send({
            message: "you've sent a required field empety"
        });

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return res.status(400).send({
            message: "you've sent a invality email"
        });

        const userFind = await UserController.findUser({
            email,
            name,
        });

        if (!!userFind) return res.status(409).send({
            message: "the email or username sent already is registered"
        });

        const newUser = {
            name: name.toString(),
            email: email.toString(),
            password: password.toString(),
        };

        try {

            const data = await UserRepository.register(newUser);

            if (data) {

                const token = Auth.generateToken(data._id.toString());
                res.status(201).json({
                    id: data._id,
                    jwt: token,
                    name: data.name,
                    email: data.email,
                });

                return;
            };

        } catch (e) {

            res.status(500).send({
                message: "internal error in our server"
            });

            return;
        }
    };
    // get an user by id
    static async getById(id: string, showPassword: boolean = false) {

        if (!id) return false;
        
        try{

            return await UserRepository.getById(id, showPassword);

        } catch(err) {
            console.log(err);
            throw new Error();
        }
    }

    // get an user by params id
    static async getByParams(req: Request, res: Response) {

        const { id } = req.params;

        const user = await UserController.getById(id, false);

        if (!user) return res.status(404).send({
            message: "user not found it",
        });

        res.status(200).send({
            user
        });

    }

    // get user projects
    static async getProjects(req: Request, res: Response) {

        if (!req.user) return res.status(500).send({
            message: "internal error"
        });

        const { id } = req.user;

        const user = await UserController.getById(id, false);

        if (!user) return false;

        const { projects } = user;

        res.status(200).send({
            projects,
        })
    };

    // log in an user
    static async login(req: Request, res: Response) {

        const { name, email, password } = req.body;
        console.log("get name, email, password from req.body: ", name, " | ", email, " | ", password);

        if (!name && !email) return res.status(400).send({
            message: "you must sent an email or name to login an user"
        });

        if (!password) return res.status(400).send({
            message: "you must sent an password to login an user"
        });

        console.log("validate the request to the backend");

        try{
            console.log("enter in the try-catch block");
            console.log("finding a user in the collection by the name or email sent in request");
            const user = await UserController.findUser({ name, email }, true);

            if (!user) return res.status(404).send({
                message: "there is no user with this name or email"
            });
            console.log("got an user");
            // compare password
            if (! await CryptPassword.comparePassword(password, user.password)) return res.status(400).send({
                message: "you must sent a valid password"
            });
            
            console.log("validate the details of the user fetched: ", user);            
            // get token
            const token = Auth.generateToken(user._id.toString());
            console.log("got a token of an user", token);
            // return user data
            res.status(200).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                jwt: token,
            });

            return;
        } catch(err){
            console.log(err);
            res.status(500).send({
                message: "internal error",
            });
        }

    }

    // find an user by email or name
    static async findUser({ email, name }: FindUserParams, showPassword: boolean = false) {

        return await UserRepository.findUser({
            email,
            name
        }, showPassword);

    }
}