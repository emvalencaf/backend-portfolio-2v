import jwt from "jsonwebtoken";

// AUTH
const jwtSecret = process.env.JWT_SECRET || "";

// generate users token
const generateToken = (id: string) => {

    return jwt.sign(
        { id },
        jwtSecret,
        {
            expiresIn: "7d",
        },
    );

};

export default generateToken;