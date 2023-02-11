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
        return __awaiter(this, void 0, void 0, function* () {
            const { websiteName, favIcon, logo, menu } = req.body;
            // user validation
            if (!req.user)
                return res.status(403).send({
                    message: "error 403: forbidden access you must be logged in for create a new portfolio"
                });
            // validations        
            if (!websiteName)
                return res.status(400).send({
                    message: "error 400: bad request you must fill a name for your portfolio"
                });
            if (!favIcon)
                return res.status(400).send({
                    message: "error 400: bad request you must choose a favicon for your portfolio"
                });
            // menu validation
            if (!menu)
                return res.status(400).send({
                    message: "error 400: bad request you must fill menu fields"
                });
            if (menu.length === 0)
                return res.status(400).send({
                    message: "error 400: bad request you must fill at leat one menu link"
                });
            const arr = [];
            menu.forEach((menuLink) => {
                if (!(menuLink === null || menuLink === void 0 ? void 0 : menuLink.link))
                    return arr.push(Object.assign({}, menuLink));
                if (!(menuLink === null || menuLink === void 0 ? void 0 : menuLink.children))
                    return arr.push(Object.assign({}, menuLink));
            });
            if (arr.length >= 1)
                return res.status(400).send({
                    message: "error 400: bad request you must fill correctly the menu links"
                });
            // logo validation
            if (!logo)
                return res.status(400).send({
                    message: "error 400: bad request you must fill logo fields"
                });
            if (!(logo === null || logo === void 0 ? void 0 : logo.altText) || !(logo === null || logo === void 0 ? void 0 : logo.link))
                return res.status(400).send({
                    message: "error 400: bad request you must fill the altText and link fields"
                });
            const { id } = req.user;
            const owner = yield user_1.default.getById(res, id, false);
            if (!owner)
                return res.status(404).send({
                    message: "error 404: user not found it"
                });
            const newData = {
                owner,
                websiteName,
                favIcon,
                logo,
                menu,
            };
            try {
                const settings = yield settings_1.default.create(newData);
                res.status(200).send(settings);
            }
            catch (err) {
                console.log("[server]: error", err);
                res.status(500).send({
                    message: "error 500: internal error"
                });
            }
            res.status(200).send(newData);
        });
    }
}
exports.default = SettingsController;
