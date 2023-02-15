import { IProject } from "../models/project";

export interface ISection {
    children?: string;
    background?: boolean;
    icon: "home" | "about" | "skills" | "projects";
    color?: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary" | "senary";
    backgroundImg?: string;
};

export interface ICreateSectionData extends ISection {
    owner?: string;
    tech?: ITech[];
    ocupation?: string;
    mainStack?: string[];
    biosData?: IBiosData;
    workData?: IWorkData;
    educationData?: IEducationData;
    projects?: IProject[];
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
