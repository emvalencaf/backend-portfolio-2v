import bcrypt from 'bcryptjs';
import UserModel from "../../models/user";

// types
import { FindUserParams, UserFrontEnd } from "../../shared-type/user";
import { Response, Request } from 'express';
import CryptPassword from '../../utils/CryptPassword';
type UserData = {
    name: string;
    password: string;
    email: string;
};

// utils


export default class UserRepository {
    // create an user
    static async register(userData: UserData) {

        // Generate password hash
        try {
            const passwordHash = await CryptPassword.encryptPassword(userData.password);

            userData.password = passwordHash;

            return UserModel.create(userData);
        } catch (err) {
            console.log(`[server]: `,err);
        }

    }


    static async logIn(req: Request, res: Response) {
        
        const { email, name, password } = req.body;

        if (!email && !name) return res.status(400).send({
            message: "error 400: bad request you must sent an email or username"
        });

        if (!password) return res.status(400).send({
            message: "error 400: bad request you must sent a password"
        });
        

    }

    // get an user by id
    static getById(id: string) {
    
        return UserModel.findById(id).select('-password');
    }

    // get an user by name
    static findUser({ email, name }: FindUserParams, showPassword: boolean = false) {
        if (email) return showPassword? UserModel.findOne({ email }) : UserModel.findOne({ email }).select("-password");

        if (name) return showPassword? UserModel.findOne({ name }) : UserModel.findOne({ name }).select("-password");

        return null;
    }
    /*
        static async findOneUser({
            email,
            username,
            _id}: FindUserParams 
            ) {
                if (_id) {
                    const user = await UserModel.findById(_id);
                    
                    return UserUtils.removePassword(user);
                }
    
                if (email) {
                    const user = await UserModel.findOne({
                        email: email
                    }).exec();
    
                    return UserUtils.removePassword(user);
                }
    
                if (username) {
                    const user = await UserModel.findOne({
                        username: username
                    }).exec();
    
                    return UserUtils.removePassword(user);
                }
        } */
}
