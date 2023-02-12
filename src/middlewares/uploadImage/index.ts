import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import SettingsController from "../../controllers/settings";
import { UserFrontEnd } from "../../shared-type/user";
import CloudinaryUpload from "../../upload/cloudinary";

export default class UploadImageMiddleware{
    static storage = new CloudinaryStorage({
        cloudinary: CloudinaryUpload.cloudinary,
        params: async (req, file) => {
    
            // Upload only png and jpg formats
            if (!file.originalname.match(/\.(png|jpg)$/)) throw Error("error 400: bad request you can only upload jpg or png images");
            
            console.log(req.body);

            // get settings for name the folder
            const { settingsId } = req.body;
    
            const settings = await SettingsController.getById(settingsId);
    
            if (!settings) throw new Error("error 400: bad request you must selected a portfolio to upload an image");
    
            // get user's details
            const { name } = req.user as UserFrontEnd;
            
        return {
            folder: `${settings.websiteName}`,
            format: file.originalname.split(".")[1],
            public_id: `${settings.websiteName}/${name}/${file.originalname}`,
        }
        }
    });

    static uploader = multer({ storage: this.storage });
}