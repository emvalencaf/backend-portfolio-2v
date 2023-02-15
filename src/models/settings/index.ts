import mongoose, { Date, Document, ObjectId as ObjectIdMongoose } from "mongoose";

export interface ISettings extends Document{
    owner: ObjectIdMongoose | string;
    websiteName: string;
    favIcon: string;
    createdAt: Date;
    updatedAt?: Date;
    logo: {
        srcImg?: string;
        altText: string;
        link: string;
        newTab?: boolean;
    },
    menu?: {
        children: string;
        icon: string;
        link: string;
        newTab?: boolean;
    }[],
    socialMedia: {
        instaURL?: string;
        linkedinURL?: string;
        facebookURL?: string;
        homepageURL?: string;
        twitterURL?: string;
        githubURL?: string;
        tiktokURL?: string;
        youtubeURL?: string;
    };
}

const menuLink = new mongoose.Schema({
    link: {
        type: String, required: true, trim: true
    },
    icon: {
        type: String, required: true, trim: true
    },
    children: {
        type: String, required: true, trim: true, maxlength: 50
    },
    newTab: {
        type: Boolean, required: false, default: false
    },
})
const socialMediaLink = new mongoose.Schema({
    instaURL: { type: String, required: false, trim: true, default: "" },
    linkedinURL: { type: String, required: false, trim: true, default: "" },
    facebookURL: { type: String, required: false, trim: true, default: "" },
    homepageURL: { type: String, required: false, trim: true, default: "" },
    twitterURL: { type: String, required: false, trim: true, default: "" },
    githubURL: { type: String, required: false, trim: true, default: "" },
    tiktokURL: { type: String, required: false, trim: true, default: "" },
    youtubeURL: { type: String, required: false, trim: true, default: "" },
})
const settingsScheme = new mongoose.Schema<ISettings>({
    websiteName: { type: String, required: true, trim: true, maxlength: 50 },
    owner: { type: mongoose.Types.ObjectId, ref: "User"},
    favIcon: { type: String, requried: true, trim: true },
    logo: {
        srcImg: {
            type: String, required: false, trim: true, default: ""
        },
        altText: {
            type: String, required: true, trim: true
        },
        link: {
            type: String, required: true, trim: true
        },
        newTab: {
            type: Boolean, required: false, default: false
        },
    },
    menu: { type: [ menuLink ], required: false, default: () => ({}) },
    socialMedia: { type: socialMediaLink, required: false },
    createdAt: { type: Date, required: false, default: Date.now()},
    updatedAt: { type: Date, required: false, defualt: null },
});

const SettingsModel = mongoose.model("Settings", settingsScheme);

export default SettingsModel;