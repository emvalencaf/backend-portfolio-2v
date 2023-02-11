import mongoose, { Date, ObjectId as ObjectIdMongoose } from "mongoose";
import { ISections } from "../sections";
import { ISettings } from "../settings";

interface ISideBar {
    githubURL?: string;
    linkedinURL?: string;
    sizes?: "small" | "medium" | "big";
}

interface IFooter {
    instaURL?: string;
    linkedinURL?: string;
    facebookURL?: string;
    homepageURL?: string;
    twitterURL?: string;
    githubURL?: string;
    tiktokURL?: string;
    sizes?: "small" | "medium" | "big";
    year: Date;
    owner: string;
}

export interface IPortfolio {
    settings: ISettings,
    content: {
        main: {
            sections: ISections;
            sideBar: ISideBar;
        }
        footer: IFooter;
    }

}
const portfolioScheme = new mongoose.Schema<IPortfolio>({
    settings: {
        type: mongoose.Types.ObjectId, ref: "Settings"
    },
    content: {
        main: {
            sections: { type: mongoose.Types.ObjectId, ref: "Sections" },
            sideBar: { 
                githubURL: { type: String, required: false, trim: true, default: "" },
                linkedinURL: { type: String, required: false, trim: true, default: "" },
                sizes: { type: String, required: false, trim: true, default: "medium" }
             },
        },
        footer: {
            instaURL: { type: String, required: false, trim: true, default: "" },
            linkedinURL: { type: String, required: false, trim: true, default: "" },
            facebookURL: { type: String, required: false, trim: true, default: "" },
            homepageURL: { type: String, required: false, trim: true, default: "" },
            twitterURL: { type: String, required: false, trim: true, default: "" },
            githubURL: { type: String, required: false, trim: true, default: "" },
            tiktokURL: { type: String, required: false, trim: true, default: "" },
            year: { type: Date, required: false, default: Date.now() },
            sizes: { type: String, required: false, trim: true, default: "medium" },
            owner: { type: String, required: true, trim: true }
        }
    }
});

const PortfolioModel = mongoose.model("Portfolio", portfolioScheme);

export default PortfolioModel;