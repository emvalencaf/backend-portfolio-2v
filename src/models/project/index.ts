import mongoose, { Document, ObjectId } from "mongoose";

export interface IProject extends Document{
    title: string;
    resume: string;
    description: string;
    mainLang: string;
    srcImg?: string;
    urlDemo: string;
    urlRepository: string;
    owner: ObjectId;
};

const projectScheme = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true, maxlength: 50,
    },
    resume: {
        type: String, required: true, trim: true, maxlength: 250,
    },
    description: {
        type: String, required: true, trim: true
    },
    mainLang: {
        type: String, required: true, trim: true
    },
    srcImg: {
        type: String, required: false, trim: true
    },
    urlDemo: {
        type: String, required: true, trim: true
    },
    urlRepository: {
        type: String, required: true, trim: true
    },
    owner: { type: mongoose.Types.ObjectId, ref: "User"},
});

const ProjectModel = mongoose.model("Project", projectScheme);


export default ProjectModel;