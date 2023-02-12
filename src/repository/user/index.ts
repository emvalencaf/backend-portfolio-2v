import UserModel, { IUser } from "../../models/user";

// types
import { FindUserParams } from "../../shared-type/user";
import { Response, Request } from 'express';

type UserData = {
    name: string;
    password: string;
    email: string;
};

// utils
import CryptPassword from '../../utils/CryptPassword';


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


    // log in an user
    static async logIn(req: Request, res: Response) {
        
        const { email, name, password } = req.body;

        if (!email && !name) return res.status(400).send({
            message: "error 400: bad request you must sent an email or username"
        });

        if (!password) return res.status(400).send({
            message: "error 400: bad request you must sent a password"
        });
        

    }


    // update an user
    static async updateUserData(dataUser: IUser, newData: UserData) {

        const {
            email,
            password,
            name
        } = newData;

        if (name) dataUser.name = name;

        if (password) dataUser.password = await CryptPassword.encryptPassword(password);

        if (email) dataUser.email = email;

        await dataUser.save();
    }

    // get an user by id
    static getById(id: string, showPassword: boolean = false) {
    
        return showPassword ? UserModel.findById(id) : UserModel.findById(id).select('-password');
    }

    // get an user by name
    static findUser({ email, name }: FindUserParams, showPassword: boolean = false) {
        if (email) return showPassword? UserModel.findOne({ email }) : UserModel.findOne({ email }).select("-password");

        if (name) return showPassword? UserModel.findOne({ name }) : UserModel.findOne({ name }).select("-password");

        return null;
    }
}
