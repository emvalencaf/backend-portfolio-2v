import SettingsModel from "../../models/settings";
import { IUser } from "../../models/user";

// types
type CreateData = {
    websiteName: string;
    owner: IUser;
    favIcon: string;
    menu?: {
        children: string;
        link: string;
        newTab?: boolean;
        icon?: "home" | "about" | "skills" | "projects";
    }[],
    logo: {
        srcImg?: string;
        altText: string;
        link: string;
        newTab?: boolean;
    },
    socialMedia?: {
        instaURL?: string;
        linkedinURL?: string;
        facebookURL?: string;
        homepageURL?: string;
        twitterURL?: string;
        githubURL?: string;
        tiktokURL?: string;
        youtubeURL?: string;
    }
}

export default class SettingsRepository {
    static async create(data:CreateData){

        return await SettingsModel.create(data);

    }

    static async find(){

        return await SettingsModel.find({}).populate({
            path: "owner",
            model: "User",
            select: "name _id email",
        });

    }

    static async getById(id: string){

        return await SettingsModel.findById(id).populate({
            path: "owner",
            model: "User",
            select: "name _id email",
        });
        
    }
}