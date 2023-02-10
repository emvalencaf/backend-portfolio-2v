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
// auth
const auth_1 = __importDefault(require("../../auth"));
// repository
const user_1 = __importDefault(require("../../repository/user"));
const CryptPassword_1 = __importDefault(require("../../utils/CryptPassword"));
// type
class UserController {
    // register a new user and sign in
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body)
                return res.status(400).send({ message: "Error 400: bad request you've sent a empety data" });
            const { name, password, email } = req.body;
            if (!name ||
                !password ||
                !email)
                return res.status(400).send({
                    message: "Error 400: bad request you've send a required field empety"
                });
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
                return res.status(400).send({
                    message: "Error 400: bad request you've send a invality email"
                });
            const userFind = yield UserController.findUser({
                email,
                name,
            });
            if (!!userFind)
                return res.status(409).send({
                    message: "Error 409: the email or username sent already is registered"
                });
            const newUser = {
                name: name.toString(),
                email: email.toString(),
                password: password.toString(),
            };
            try {
                const data = yield user_1.default.register(newUser);
                if (data) {
                    const token = auth_1.default.generateToken(data._id.toString());
                    res.status(201).json({
                        id: data._id,
                        jwt: token,
                        name: data.name,
                        email: data.email,
                    });
                }
                ;
            }
            catch (e) {
                res.status(500).send({
                    message: "error 500: internal error in our server"
                });
            }
        });
    }
    ;
    // get an user by id
    static getById(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                res.status(400).send({
                    message: "error 400: bad request you must sent an id"
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
    // get an user by params id
    static getByParams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return UserController.getById(req, res, id);
        });
    }
    // log in an user
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name && !email)
                return res.status(400).send({
                    message: "error 400: bad request you must sent an email or name to login an user"
                });
            if (!password)
                return res.status(400).send({
                    message: "error 400: bad request you must sent an password to login an user"
                });
            const user = yield UserController.findUser({ name, email }, true);
            if (!user)
                return res.status(404).send({
                    message: "error 404: there is no user with this name or email"
                });
            // compare password
            if (!(yield CryptPassword_1.default.comparePassword(password, user.password)))
                return res.status(400).send({
                    message: "error 400: bad request you must send a valid password"
                });
            // get token
            const token = auth_1.default.generateToken(user._id.toString());
            // return user data
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                jwt: token,
            });
        });
    }
    // find an user by email or name
    static findUser({ email, name }, showPassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findUser({
                    email,
                    name
                }, showPassword);
            }
            catch (err) {
                console.log("[server]: error:", err);
                return null;
            }
        });
    }
}
exports.default = UserController;
