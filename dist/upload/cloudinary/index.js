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
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});
class CloudinaryUpload {
    static uploadImage(imagePath, websiteName, filename, folder, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cloudinary.uploader.upload(imagePath, {
                public_id: `/${websiteName}/${owner}/${folder}/${filename}`
            });
        });
    }
}
exports.default = CloudinaryUpload;
CloudinaryUpload.cloudinary = cloudinary_1.v2;
