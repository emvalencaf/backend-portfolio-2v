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
const settings_1 = __importDefault(require("../../repository/settings"));
const user_1 = __importDefault(require("../user"));
class SettingsController {
    static create(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const { websiteName, favIcon, logo, menu, socialMedia } = req.body;
            // user validation
            if (!req.user)
                return res.status(403).send({
                    message: "you must be logged in for create a new portfolio"
                });
            // validations        
            if (!websiteName)
                return res.status(400).send({
                    message: "error 400: bad request you must fill a name for your portfolio"
                });
            const files = req.files;
            ;
            if (!files)
                return res.status(400).send({
                    message: "you must upload at least favicon",
                });
            if (!files || files["favIcon"][0].originalname.match(/\.(ico)$/))
                return res.status(400).send({
                    message: "the favicon must be in .ico file",
                });
            const data = {
                websiteName,
                favIcon: (_a = files["favIcon"][0]) === null || _a === void 0 ? void 0 : _a.path,
                logo: JSON.parse(logo),
                socialMedia: socialMedia && JSON.parse(socialMedia) || {},
            };
            data.logo.srcImg = (_b = files["favIcon"][0]) === null || _b === void 0 ? void 0 : _b.path;
            console.log(data);
            if (!data.favIcon)
                return res.status(400).send({
                    message: "you must choose a favicon for your portfolio"
                });
            // logo validation
            if (!data.logo)
                return res.status(400).send({
                    message: "error 400: bad request you must fill logo fields"
                });
            if (!((_c = data.logo) === null || _c === void 0 ? void 0 : _c.altText) || !((_d = data.logo) === null || _d === void 0 ? void 0 : _d.link))
                return res.status(400).send({
                    message: "error 400: bad request you must fill the altText and link fields"
                });
            const { id } = req.user;
            const owner = yield user_1.default.getById(id, false);
            if (!owner)
                return res.status(404).send({
                    message: "user not found it"
                });
            const newData = {
                owner,
                websiteName,
                favIcon,
                logo: data.logo,
                socialMedia: data.socialMedia,
            };
            console.log(newData);
            try {
                const settings = yield settings_1.default.create(newData);
                settings.save();
                res.status(200).send(settings);
            }
            catch (err) {
                console.log("[server]: error: ", err);
                res.status(500).send({
                    message: "internal error"
                });
            }
        });
    }
    static getAllSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const settings = yield settings_1.default.find();
                res.status(200).send(settings);
            }
            catch (err) {
                console.log(`[server]: error : ${err}`);
                res.status(500).send({
                    message: "error 500: internal error"
                });
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield settings_1.default.getById(id);
            return settings;
        });
    }
    static getByParams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const { id } = req.params;
                    const settings = SettingsController.getById(id);
                    if (!settings)
                        return res.status(404).send({
                            message: "settings not found it",
                        });
                    return res.status(200).send({
                        settings,
                    });
                }
            }
            catch (err) {
                console.log("[server]: error: ", err);
                res.status(500).send({
                    message: "internal error",
                });
            }
        });
    }
}
exports.default = SettingsController;
