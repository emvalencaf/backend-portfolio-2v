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
const generateToken_1 = __importDefault(require("../../auth/generateToken"));
// repository
const user_1 = __importDefault(require("../../repository/user"));
// type
class UserController {
    // register a new user and sign in
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body)
                return res.status(400).send({ message: "Error 400: bad request you've sent a empety data" });
            const { username, password, email } = req.body;
            if (!username ||
                !password ||
                !email)
                return res.status(400).send({
                    message: "Error 400: bad request you've send a required field empety"
                });
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
                return res.status(400).send({
                    message: "Error 400: bad request you've send a invality email"
                });
            //if (await UserController.findOneUser(null, null, { email: email })) return res.status(409).send({
            //    message:"Error 409: the email sent already is registered"
            //});
            // if (await UserController.findOneUser(null, null, { username: username })) return res.status(409).send({
            //    message:"Error 409: the username sent already is registered"
            // });
            const userFind = yield UserController.findUser({
                email,
                username,
            });
            console.log(userFind);
            if (!!userFind)
                return res.status(409).send({
                    message: "Error 409: the email or username sent already is registered"
                });
            const newUser = {
                username: username.toString(),
                email: email.toString(),
                password: password.toString(),
            };
            try {
                const data = yield user_1.default.register(newUser);
                if (data) {
                    const token = (0, generateToken_1.default)(data._id.toString());
                    res.status(201).json(token);
                }
                ;
            }
            catch (e) {
                res.status(500).send({
                    message: "error 500: internal error in our server"
                });
                console.log("[server]: Error 500", e);
            }
        });
    }
    ;
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id)
                res.status(400).send({
                    message: "error 400: bad request you must sent an id"
                });
            if (!req.params.id.match(/^[a-fA-F0-9]{24}$/))
                res.status(500).send({
                    message: "error 400: bad request you must sent a valid id"
                });
            try {
                return yield user_1.default.getById(req.params.id);
            }
            catch (err) {
                console.log(`[server]: user's id ${req.params.id} not found it`);
                res.status(404).send({
                    message: "error 404: user not found it",
                });
            }
        });
    }
    static findUser({ email, username }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findUser({
                    email,
                    username
                });
            }
            catch (err) {
                console.log("[server]: error:", err);
                return null;
            }
        });
    }
}
exports.default = UserController;
