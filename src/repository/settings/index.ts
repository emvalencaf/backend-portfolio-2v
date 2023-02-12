import SettingsModel from "../../models/settings";
import { IUser } from "../../models/user";

// types
type CreateData = {
    websiteName: string;
    owner: IUser;
    favIcon: string;
    menu: {
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
}

export default class SettingsRepository {
    static async create(data:CreateData){

        return await SettingsModel.create(data);

    }

    static async find(){

        return await SettingsModel.find({});

    }

    static async getById(id: string){

        return await SettingsModel.findById(id);
        
    }
}