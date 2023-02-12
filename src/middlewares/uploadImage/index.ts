import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import CloudinaryUpload from "../../upload/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: CloudinaryUpload.cloudinary,
    params: async (req, file) => {
        return {
            folder: "dev",
            format: file.originalname,
            public_id: "",
        }
    }
});