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
const handleFile_1 = __importDefault(require("../../utils/handleFile"));
class SettingsController {
    static create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { websiteName, favIcon, logo, socialMedia } = req.body;
            // user validation
            if (!req.user)
                return res.status(403).send({
                    message: "you must be logged in for create a new portfolio"
                });
            // validations        
            if (!websiteName)
                return res.status(400).send({
                    message: "you must fill a name for your portfolio"
                });
            if (!logo)
                return res.status(400).send({
                    message: "you must fill a logo",
                });
            try {
                let files;
                if (req.files)
                    files = req.files;
                if (!files || !files["favIcon"] || files["favIcon"][0].originalname.match(/\.(ico)$/))
                    return res.status(400).send({
                        message: "the favicon must be in .ico file",
                    });
                const data = {
                    websiteName,
                    favIcon: handleFile_1.default.getUrlFromFile(files["favIcon"][0]),
                    logo: JSON.parse(logo),
                    socialMedia: socialMedia && JSON.parse(socialMedia) || {},
                };
                if (files["logoImg"])
                    data.logo.srcImg = handleFile_1.default.getUrlFromFile(files["logoImg"][0]);
                if (!data.favIcon)
                    return res.status(400).send({
                        message: "you must choose a favicon for your portfolio"
                    });
                // logo validation
                if (!data.logo)
                    return res.status(400).send({
                        message: "you must fill logo fields"
                    });
                if (!((_a = data.logo) === null || _a === void 0 ? void 0 : _a.altText) || !((_b = data.logo) === null || _b === void 0 ? void 0 : _b.link))
                    return res.status(400).send({
                        message: "you must fill the altText and link fields"
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
                    favIcon: data.favIcon,
                    logo: data.logo,
                    socialMedia: data.socialMedia,
                };
                console.log(newData);
                const settings = yield settings_1.default.create(newData);
                settings.save();
                res.status(200).send({ settings });
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
                if (!settings)
                    return res.status(404).send({
                        message: "no settings were found it",
                    });
                res.status(200).send(settings);
                return;
            }
            catch (err) {
                console.log(`[server]: error : ${err}`);
                res.status(500).send({
                    message: "internal error"
                });
                return;
            }
        });
    }
    static update(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { websiteName, socialMedia, logo } = req.body;
            // user validation
            if (!req.user)
                return res.status(403).send({
                    message: "you must be logged in for create a new portfolio"
                });
            // validations        
            if (!websiteName)
                return res.status(400).send({
                    message: "you must fill a name for your portfolio"
                });
            if (!logo)
                return res.status(400).send({
                    message: "you must fill a logo",
                });
            try {
                const settings = yield SettingsController.getById(id);
                if (!settings)
                    return res.status(404).send({
                        message: "settings was not found it",
                    });
                let files;
                const data = {
                    websiteName,
                    logo: JSON.parse(logo),
                    favIcon: settings.favIcon,
                    socialMedia: socialMedia && JSON.parse(socialMedia) || {},
                };
                if (req.files)
                    files = req.files;
                if (files) {
                    if ((!files["favIcon"] ||
                        files["favIcon"][0].originalname.match(/\.(ico)$/)) && !settings.favIcon)
                        return res.status(400).send({
                            message: "the favicon must be in .ico file",
                        });
                    data.favIcon = files["favIcon"][0] ? handleFile_1.default.getUrlFromFile(files["favIcon"][0]) : settings.favIcon;
                    if (files["logoImg"])
                        data.logo.srcImg = files["logoImg"][0] ? handleFile_1.default.getUrlFromFile(files["logoImg"][0]) : settings.logo.srcImg;
                }
                if (!data.favIcon)
                    return res.status(400).send({
                        message: "you must choose a favicon for your portfolio"
                    });
                // logo validation
                if (!data.logo)
                    return res.status(400).send({
                        message: "you must fill logo fields"
                    });
                if (!((_a = data.logo) === null || _a === void 0 ? void 0 : _a.altText) || !((_b = data.logo) === null || _b === void 0 ? void 0 : _b.link))
                    return res.status(400).send({
                        message: "you must fill the altText and link fields"
                    });
                const { id: userId } = req.user;
                const owner = yield user_1.default.getById(userId, false);
                if (!owner)
                    return res.status(404).send({
                        message: "user not found it"
                    });
                const newData = {
                    owner,
                    websiteName,
                    favIcon: data.favIcon,
                    logo: data.logo,
                    socialMedia: data.socialMedia,
                };
                console.log(newData);
                yield settings_1.default.update(newData, settings);
                res.status(200).send({
                    settings
                });
            }
            catch (err) {
                console.log("[server]: error: ", err);
                res.status(500).send({
                    message: "internal error"
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
            const { id = "" } = req.params;
            try {
                if (id) {
                    const settings = yield SettingsController.getById(id);
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
