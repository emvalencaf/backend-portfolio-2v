import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

export default class CloudinaryUpload{
    
    static cloudinary = cloudinary;

    static async uploadImage(
            imagePath: string, 
            websiteName: string, 
            filename: string, 
            folder: string, 
            owner: string
        ) {
        
        return await this.cloudinary.uploader.upload(imagePath, {
            public_id: `/${websiteName}/${owner}/${folder}/${filename}`        
        });
    }
}
