import { UserMongoose } from "../shared-type/user";

export default class UserUtils{
    static removePassword(user: UserMongoose | null){

        if (user?.password) delete user?.password;
                
        return user;
    };
}