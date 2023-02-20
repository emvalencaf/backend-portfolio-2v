import mongoose, { Date, ObjectId as ObjectIdMongoose } from "mongoose";
import { ISection } from "../../shared-type/sections";
import { ISettings } from "../../shared-type/settings";

export interface IPortfolio {
    settings: ISettings,
    content: {
        sections: ISection;
    };
    createdAt: Date;
    updatedAt?: Date;

}
const portfolioScheme = new mongoose.Schema<IPortfolio>({
    settings: {
        type: mongoose.Types.ObjectId, ref: "Settings"
    },
    content: {
        sections: [{ type: mongoose.Types.ObjectId, ref: "Section" }],
    },
    createdAt: { type: Date, required: false, default: Date.now()},
    updatedAt: { type: Date, required: false, defualt: null },
});

const PortfolioModel = mongoose.model("Portfolio", portfolioScheme);

export default PortfolioModel;