import { IUser } from "../models/user";
import { Document, ObjectId } from "mongoose";

export interface IProject extends Document{
    title: string;
    resume: string;
    description: string;
    mainLang: string;
    srcImg?: string;
    urlDemo: string;
    urlRepository: string;
    createdAt?: Date;
    updatedAt?: Date | number | null;
    owner: ObjectId;
};

export type CreateDataParamsProject = {
    title: string;
    resume: string;
    description: string;
    mainLang: "javascript" | "typescript" | "html" | "css" | "python" | "java" | "csharp" | "php" | "cplus";
    srcImg?: string;
    urlDemo: string;
    urlRepository: string;
    owner: IUser | ObjectId;
}