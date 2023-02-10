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
const generateToken_1 = __importDefault(require("../auth/generateToken"));
// repository
const user_1 = __importDefault(require("../repository/user"));
class UserController {
    // register a new user and sign in
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body)
                return res.status(400).send({ message: "Error 400: bad request you've send a empety data" });
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
            if (yield UserController.findOneUser(null, null, { email: email }))
                return res.status(409).send({
                    message: "Error 409: the email sent already is registered"
                });
            if (yield UserController.findOneUser(null, null, { username: username }))
                return res.status(409).send({
                    message: "Error 409: the username sent already is registered"
                });
            const newUser = {
                username: username.toString(),
                email: email.toString(),
                password: password.toString(),
            };
            try {
                const data = yield user_1.default.register(newUser);
                const token = (0, generateToken_1.default)(data._id.toString());
                res.status(201).json(token);
            }
            catch (e) {
                res.status(500).send({
                    message: "error 500: internal error in our server"
                });
                console.log("[Servidor]: Error 500", e);
            }
        });
    }
    ;
    static findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserController.findOneUser(req, res, {
                email: undefined,
                username: undefined,
                _id: undefined
            });
        });
    }
    static findOneUser(req, res, { email, username, _id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req && res) {
                const data = yield user_1.default.findOneUser({
                    _id: req.params.id,
                    email: req.params.email,
                    username: req.params.username,
                });
                if (!data)
                    return res === null || res === void 0 ? void 0 : res.status(404).send({
                        message: "error 404: not found"
                    });
                return res.status(200).send(data);
            }
            ;
            if (!email ||
                !username ||
                !_id)
                return;
            return yield user_1.default.findOneUser({
                email,
                username,
                _id,
            });
        });
    }
}
exports.default = UserController;
