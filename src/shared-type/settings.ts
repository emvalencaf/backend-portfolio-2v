import { Date, Document, ObjectId as ObjectIdMongoose } from "mongoose";

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
    socialMedia?: {
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

