"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// UserController
const user_1 = __importDefault(require("../controllers/user"));
// enviroment variables
const jwtSecret = process.env.JWT_SECRET || "";
class Auth {
    // get a token by an id
    static generateToken(id) {
        return jsonwebtoken_1.default.sign({ id }, jwtSecret, {
            expiresIn: "7d",
        });
    }
    // get an id or empety string from a token
    static verifyToken(token) {
        const verified = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (typeof verified === "string")
            return;
        return verified;
    }
    // verifies a token and 
    static authGuard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get token from the headers request
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            // check if header has a token
            if (!token)
                return res.status(403).json({
                    message: "error 403: forbidden access"
                });
            // check if token is valid
            try {
                const verified = Auth.verifyToken(token);
                const user = yield user_1.default.getById(verified === null || verified === void 0 ? void 0 : verified.id);
                if (!user)
                    return res.status(404).send({
                        message: "error 404: user not found"
                    });
                req.user = {
                    id: (user === null || user === void 0 ? void 0 : user._id.toString()) || "",
                    name: (user === null || user === void 0 ? void 0 : user.name) || "",
                    email: (user === null || user === void 0 ? void 0 : user.email) || "",
                };
                req.token = {
                    jwt: token,
                    iat: verified === null || verified === void 0 ? void 0 : verified.iat,
                    exp: verified === null || verified === void 0 ? void 0 : verified.exp,
                };
                next();
            }
            catch (err) {
                console.log("[server]: error", err);
                res.status(403).json({
                    message: "error 403: forbidden access this token is invalid"
                });
            }
        });
    }
}
exports.default = Auth;
