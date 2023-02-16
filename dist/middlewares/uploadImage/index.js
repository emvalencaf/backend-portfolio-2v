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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../../upload/cloudinary"));
class UploadImageMiddleware {
}
exports.default = UploadImageMiddleware;
_a = UploadImageMiddleware;
UploadImageMiddleware.storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default.cloudinary,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(JSON.stringify(req.body));
        // Upload only png and jpg formats
        if (!file.originalname.match(/\.(png|jpg|ico)$/))
            throw Error("error 400: bad request you can only upload jpg or png images");
        // get settings for name the folder
        // const { settingsId } = req.body;
        // const settings = await SettingsController.getById(settingsId);
        // if (!settings) throw new Error("error 400: bad request you must selected a portfolio to upload an image");
        // get user's details
        const { name } = req.user;
        return {
            folder: `dev`,
            format: file.originalname.split(".")[1],
            public_id: `${name}/${file.originalname}`,
        };
    })
});
UploadImageMiddleware.uploader = (0, multer_1.default)({ storage: _a.storage });
