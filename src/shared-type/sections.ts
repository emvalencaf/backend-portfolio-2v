import { Date, Document, ObjectId as ObjectIdMongoose } from "mongoose";
import { IProject } from "../shared-type/project";
import { ISettings } from "../shared-type/settings";

export interface ISectionDocument extends Document{
    title: string;
    children: string;
    background?: boolean;
    backgroundImg?: string;
    icon?: string;
    createdAt?: Date;
    updatedAt?: Date | number | null;
    biosData?: IBiosData;
    urlDownload?: string;
    workData?: IWorkData;
    owner?: string;
    ocupation?: string;
    mainStack?: string[];
    educationData?: IEducationData;
    techs?: ITechData;
    projects?: ObjectIdMongoose[] | string[];
    settings: ObjectIdMongoose | string;
}
export interface ISection {
    title: string;
    children?: string;
    background?: boolean;
    icon: "home" | "about" | "skills" | "projects";
    color?: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary" | "senary";
    backgroundImg?: string;
    settings?: ISettings;
};

export interface ICreateSectionData extends ISection {
    owner?: string;
    techs?: string | ITechData;
    ocupation?: string;
    mainStack?: string | string[];
    biosData?: IBiosData;
    workData?: string;
    educationData?: string;
    projects?: string | ObjectIdMongoose[] | string[];
    urlDownload?: string;
}


export interface IHomeSection extends ISection {
    owner: string;
    ocupation: string;
    mainStack: string[];
}

export interface IAboutSection extends ISection {
    biosData: IBiosData;
    workData: IWorkData;
    urlDownload: string;
    educationData: IEducationData;
}

export interface ISkillsSection extends ISection {
    techs: ITech[];
}

export interface IProjectsSection extends ISection {
    projects: IProject[];
}

export interface IBiosData {
    bios: string;
    profilePhoto?: IProfilePhoto;
}

export interface IWork {
    employer: string;
    ocupation: string;
    jobDescription: string;
    startIn: Date;
    endIn: Date;
    showData: boolean;
}

export interface IWorkData {
    workExperience: IWork[];
}

export interface IEducation {
    title: string;
    workTime: string | number;
    institution: string;
    resume?: string;
    startIn: Date;
    endIn?: Date;
    urlDownload?: string;
}

export interface IEducationData {
    higherEducation: IEducation[];
    courses: IEducation[];
}

export interface ITechData {
    techs: ITech[];
}

export interface ITech {
    techName: string;
    techDescription: string;
    icon?: string;
    showTechDescription?: boolean;
}

export interface IProfilePhoto {
    srcImg: string;
    altText: string;
}
