import mongoose from "mongoose";
import { IProject } from "../../shared-type/project";

const projectScheme = new mongoose.Schema<IProject>({
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
    createdAt: { type: Date, required: false, default: Date.now()},
    updatedAt: { type: Date, required: false, default: null},
});

const ProjectModel = mongoose.model("Project", projectScheme);


export default ProjectModel;