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
            console.log(`[server]: error: `,err);
            throw new Error();
        }

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
    
        return showPassword ? UserModel.findById(id).populate("projects") : UserModel.findById(id).select('-password').populate("projects");
    }

    // get an user by name
    static findUser({ email, name }: FindUserParams, showPassword: boolean = false) {
        if (email) return showPassword? UserModel.findOne({ email }) : UserModel.findOne({ email }).select("-password");

        if (name) return showPassword? UserModel.findOne({ name }) : UserModel.findOne({ name }).select("-password");

        return null;
    }
}
