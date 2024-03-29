// models
import ModelPortfolio from "../../models/portfolio";

// types
import { ISection, ISectionDocument } from "../../shared-type/sections";
import { ISettings } from "../../shared-type/settings";
type CreateDataParams = {
    settings: ISettings;
    content: {
        sections: ISectionDocument[];
    };
}

export default class PortfolioRepository{
    static async getById(id?: string) {

        if (id) return await ModelPortfolio.findById(id).populate("owner");

        return await ModelPortfolio.find({}).populate("owner");
    }

    static async create(data: CreateDataParams) {

        return await ModelPortfolio.create(data);
    }

    static async find() {
        return await ModelPortfolio.find({}).populate([
            {
                path: "settings",
                model: "Settings",
                populate: {
                    path: "owner",
                    model: "User",
                    select: "name _id email",
                }
            },
            {
                path: "content",
                populate: {
                    path: "sections",
                    model: "Section",
                    populate: {
                        path: "projects",
                        model: "Project",
                        select: "_id resume description mainLang srcImg urlDemo urlRepository title",
                    }
                }
            }
        ]);
    }

}