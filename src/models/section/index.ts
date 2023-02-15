import mongoose, { Date, Document, ObjectId } from "mongoose"
import { IBiosData, IEducation, IEducationData, IProfilePhoto, ISection, ITech, IWork, IWorkData } from "../../shared-type/sections";


// type

// subDocuments
const educationSecheme = new mongoose.Schema<IEducation>({
    title: { type: String, required: true, trim: true, maxlength: 150 },
    institution: { type: String, required: true, trim: true, maxlength: 150 },
    workTime: { type: String || Number, required: true, trim: true, maxlength: 50 },
    resume: { type: String || Number, required: true, trim: true, maxlength: 250 },
    startIn: { type: Date, required: true },
    endIn: { type: Date, required: false, default: null },
    urlDownload: { type: String, required: true, trim: false },
})

const educationDataScheme = new mongoose.Schema<IEducationData>({
    courses: [{
        type: educationSecheme,
        default: () => ({}),
    }],
    higherEducation: [{
        type: educationSecheme,
        default: () => ({}),
    }],
});

const workScheme = new mongoose.Schema<IWork>({
    employer: { type: String, required: true, trim: true, maxlength: 150 },
    ocupation: { type: String, required: true, trim: true, },
    startIn: { type: Date, required: true, },
    endIn: { type: Date, required: false, default: null },
    jobDescription: { type: String, required: true, trim: true, },
    showData: { type: Boolean, trim: true, required: false, default: false },
});

const workDataScheme = new mongoose.Schema<IWorkData>({
    workExperience: [{
        type: workScheme,
        default: () => ({}),
    }],
});

const profilePhotoScheme = new mongoose.Schema<IProfilePhoto>({
    srcImg: { type: String, trim: true, required: true },
    altText: { type: String, trim: true, required: true },
})

const biosDataScheme = new mongoose.Schema<IBiosData>({
    bios: { type: String, trim: true, required: true, maxlength: 1000 },
    profilePhoto: {
        type: profilePhotoScheme,
        default: () => ({}),
        required: true,
    }
})

const techScheme = new mongoose.Schema<ITech>({

    techName: { type: String, trim: true, required: true, maxlength: 50 },
    techDescription: { type: String, trim: true, required: true, maxlength: 1000 },
    icon: { type: String, trim: false, required: true, default: "" },
    showTechDescription: { type: Boolean, trim: true, required: false, default: false },

})

const sectionScheme = new mongoose.Schema({
    children: { type: String, trim: true, required: false },
    background: { type: Boolean, trim: true, required: false, default: false },
    icon: { type: String, required: false, trim: true, default: "home" },
    backgroundImg: { type: String, required: false, trim: true, default: "" },
    createdAt: { type: Date, required: false, default: Date.now() },
    updatedAt: { type: Date, required: false, default: null },
    biosData: {
        type: biosDataScheme,
        default: () => ({}),
        required: false,
    },
    workData: {
        type: workDataScheme,
        required: false,
        default: () => ({}),
    },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    ocupation: { type: String, trim: true, required: false },
    urlDownload: { type: String, required: false },
    mainStack: { type: [String], required: false },
    educationData: { type: educationDataScheme, required: false, default: () => ({}) },
    techs: {
        type: [{
            type: techScheme, default: () => ({}),
        }], required: false },
});

const SectionModel = mongoose.model("Section", sectionScheme);

export default SectionModel;