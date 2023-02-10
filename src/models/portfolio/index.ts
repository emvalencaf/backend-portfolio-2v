import mongoose from "mongoose";

const portfolioScheme = new mongoose.Schema({
    header: {
        logo: {
            srcImg: { 
                type: String,
                required: false,
                trim: true,
                default: "" 
            },
            altText: { 
                type: String, 
                required: true, 
                trim: true 
            },
            link: { 
                type: String, 
                required: true, 
                trim: true 
            },
        },
        menu: [
            {
                children: {
                    type: String,
                    required: true,
                    trim: true,
                    default: "",
                },
                icon: {
                    type: String,
                    required: false,
                    trim: true,
                    default: "",
                },
                link: { 
                    type: String, 
                    required: true, 
                    trim: true 
                },
                newTab: {
                    type: Boolean,
                    required: false,
                    default: false,
                }
            }
        ],
    },
    main: {
        sections: {
            home: {
                id: {
                    type: String,
                    required: false,
                    trim: true,
                    default: "#",
                },
                icon: {
                    type: String,
                    requred: false,
                    trim: true,
                    default: "",
                },
                background: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
                color: {
                    type: String,
                    required: false,
                    default: "secondary",
                },
                ownerName: {
                    type: String,
                    required: false,
                    trim: true,
                    default: "",
                },
                ocupation: {
                    type: String,
                    required: false,
                    trim: true,
                    default: "",
                },
                mainStack: [
                    {
                        type: String,
                        required: false,
                        trim: true,
                    }
                ],
            },
            about: {
                id: {
                    type: String,
                    required: false,
                    trim: true,
                    default: "about",
                },
                icon: {
                    type: String,
                    requred: false,
                    trim: true,
                    default: "",
                },
                background: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
                color: {
                    type: String,
                    required: false,
                    default: "secondary",
                },
                biosData: {
                    bios: {
                        type: String,
                        required: true,
                        trim: true,
                        maxlength: 1000,
                    },
                    profilePhoto: {
                        srcImg: {
                            type: String,
                            required: true,
                            trim: true,
                        },
                        altText: {
                            type: String,
                            required: true,
                            trim: true,
                        },
                    },
                },
                workData: {
                    workExperience: [
                        {
                            employer: {
                                type: String,
                                required: true,
                                trim: true,
                            },
                            ocupation: {
                                type: String,
                                required: true,
                                trim: true,
                            },
                            jobDescription: {
                                type: String,
                                required: true,
                                trim: true,
                            },
                            startIn: {
                                type: Date,
                                required: true,
                            },
                            endIn: {
                                type: Date,
                                required: false,
                            },
                            showData: {
                                type: Boolean,
                                required: false,
                                default: false,
                            }
                        }
                    ]
                },
                urlDownload: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
            skills: {

            },
            project: {

            },
        },
        sideBar: {

        },
    },
    footer: {

    },
    createdAt: { 
        type: Date, 
        default: Date.now()
    },
    updatedAt: { 
        type: Date, 
        required: false 
    },
});

const PortfolioModel = mongoose.model("Portfolio", portfolioScheme);

export default PortfolioModel;