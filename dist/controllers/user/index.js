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
    // get current user
    static getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const token = req.token;
            res.status(200).json({
                user: Object.assign({}, user),
                token: Object.assign({}, token),
            });
        });
    }
    // change password of an user
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword, password, email } = req.body;
            // frontend data validations
            if (!newPassword)
                return res.status(400).send({
                    message: "you must sent a new password"
                });
            if (!password)
                return res.status(400).send({
                    message: "you must sent the currently password"
                });
            if (!req.user)
                return res.status(403).send({
                    message: "forbidden access you must be logged to change your password"
                });
            if (req.user.email !== email)
                return res.status(403).send({
                    message: "forbidden access you can not changed a password of another account"
                });
            // get user's data by the authGuard
            const { id } = req.user;
            const user = yield UserController.getById(id, true);
            if (!user)
                return res.status(404).send({
                    message: "user not found"
                });
            // check password
            if (!(yield CryptPassword_1.default.comparePassword(password, user.password)))
                return res.status(400).send({
                    message: "you must confirm your currently password"
                });
            try {
                yield user_1.default.updateUserData(user, {
                    email: "",
                    password: newPassword,
                    name: "",
                });
                res.status(200).send({
                    message: "a new user password was successfully saved"
                });
                return;
            }
            catch (err) {
                console.log(`[server]: error`, err);
                res.status(500).send({
                    message: "internal error"
                });
                return;
            }
        });
    }
    // register a new user and sign in
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body)
                return res.status(400).send({ message: "you've sent a empety data" });
            const { name, password, email } = req.body;
            console.log("in register method");
            if (!name ||
                !password ||
                !email)
                return res.status(400).send({
                    message: "you've sent a required field empety"
                });
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
                return res.status(400).send({
                    message: "you've sent a invality email"
                });
            const userFind = yield UserController.findUser({
                email,
                name,
            });
            if (!!userFind)
                return res.status(409).send({
                    message: "the email or username sent already is registered"
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
                    return;
                }
                ;
            }
            catch (e) {
                res.status(500).send({
                    message: "internal error in our server"
                });
                return;
            }
        });
    }
    ;
    // get an user by id
    static getById(id, showPassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return false;
            try {
                return yield user_1.default.getById(id, showPassword);
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
    // get an user by params id
    static getByParams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield UserController.getById(id, false);
            if (!user)
                return res.status(404).send({
                    message: "user not found it",
                });
            res.status(200).send({
                user
            });
        });
    }
    // get user projects
    static getProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                return res.status(500).send({
                    message: "internal error"
                });
            const { id } = req.user;
            const user = yield UserController.getById(id, false);
            if (!user)
                return false;
            const { projects } = user;
            res.status(200).send({
                projects,
            });
        });
    }
    ;
    // log in an user
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name && !email)
                return res.status(400).send({
                    message: "you must sent an email or name to login an user"
                });
            if (!password)
                return res.status(400).send({
                    message: "you must sent an password to login an user"
                });
            try {
                const user = yield UserController.findUser({ name, email }, true);
                if (!user)
                    return res.status(404).send({
                        message: "there is no user with this name or email"
                    });
                // compare password
                if (!(yield CryptPassword_1.default.comparePassword(password, user.password)))
                    return res.status(400).send({
                        message: "you must sent a valid password"
                    });
                // get token
                const token = auth_1.default.generateToken(user._id.toString());
                // return user data
                res.status(200).json({
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                    jwt: token,
                });
                return;
            }
            catch (err) {
                console.log(err);
                res.status(500).send({
                    message: "internal error",
                });
            }
        });
    }
    // find an user by email or name
    static findUser({ email, name }, showPassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findUser({
                email,
                name
            }, showPassword);
        });
    }
}
exports.default = UserController;
