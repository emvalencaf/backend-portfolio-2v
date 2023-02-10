import bcrypt from "bcryptjs";

export default class CryptPassword{
    static async encryptPassword(password: string = ""){
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(
            password,
            salt
        );
    }

    static async comparePassword(password: string = "", userPassword: string = "") {
        return await bcrypt.compare(password, userPassword);
    }
}