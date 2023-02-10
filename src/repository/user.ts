import UserModel from "../models/user";

// types
import { FindUserParams, UserFrontEnd } from "../shared-type/user";

// utils
import UserUtils from "../utils/user";

export default class UserRepository{
    static register(data:UserFrontEnd) {

        const { username, password, email } = data;

        const newData = {
            username,
            password,
            email
        };

        return UserModel.create(newData);

    }

    static async findOneUser({
        email,
        username,
        _id}: FindUserParams 
        ) {
            if (_id) {
                const user = await UserModel.findById(_id)
                
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
    }
}
