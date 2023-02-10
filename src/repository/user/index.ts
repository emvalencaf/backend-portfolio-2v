import bcrypt from 'bcryptjs';
import UserModel from "../../models/user";

// types
import { FindUserParams, UserFrontEnd } from "../../shared-type/user";

// utils


export default class UserRepository {
    static async register(userData: UserFrontEnd) {

        // Generate password hash
        try {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(
                userData.password || '',
                salt
            );

            userData.password = passwordHash;

            return UserModel.create(userData);
        } catch (err) {
            console.log(`[server]: `,err);
        }

    }

    static getById(id: string) {
    
        return UserModel.findById(id).select('-password');
    }

    static findUser({ email, username }: FindUserParams) {
        if (email) return UserModel.findOne({ email }).select("-password").exec();

        if (username) return UserModel.findOne({ username }).select("-password").exec();
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
