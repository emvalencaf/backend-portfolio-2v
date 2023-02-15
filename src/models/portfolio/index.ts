import mongoose, { Date, ObjectId as ObjectIdMongoose } from "mongoose";
import { ISections } from "../sections";
import { ISettings } from "../settings";

export interface IPortfolio {
    settings: ISettings,
    content: {
        sections: ISections;
    };
    createdAt: Date;
    updatedAt?: Date;

}
const portfolioScheme = new mongoose.Schema<IPortfolio>({
    settings: {
        type: mongoose.Types.ObjectId, ref: "Settings"
    },
    content: {
        sections: { type: mongoose.Types.ObjectId, ref: "Sections" },
    },
    createdAt: { type: Date, required: false, default: Date.now()},
    updatedAt: { type: Date, required: false, defualt: null },
});

const PortfolioModel = mongoose.model("Portfolio", portfolioScheme);

export default PortfolioModel;