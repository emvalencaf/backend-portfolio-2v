// controller
import UserController from "../user";

// repository
import SectionRepository from "../../repository/section";

// validators
import ProjectsSectionValidator from "./validators/projects";
import AboutSectionValidator from "./validators/about";
import HomeSectionValidator from "./validators/home";
import SkillsSectionValidator from "./validators/skills";

// type
import { Request, Response } from "express";
import { IAboutSection, ICreateSectionData, IHomeSection, IProjectsSection, ISection, ISkillsSection } from "../../shared-type/sections";
import SettingsController from "../settings";

export default class SectionController {

    // create a section
    static async create(req: Request, res: Response) {

        try {
            // get the type of section to be created by params
            const { typeSection } = req.params;
            const data = req.body;

            if (!req.user) return;

            const { id } = req.user;

            const owner = await UserController.getById(id, false);

            // it will check if there's a settings attached (by an id) in the body of the request
            if (!data.settings) return res.status(400).send({
                message: "you must choose a setting to attached a section"
            });

            const settings = await SettingsController.getById(data.settings);

            // it will check if the settings attached in the body's request is a valid one
            if (!settings) return res.status(404).send({
                message: "settings not found it"
            });

            // each setting can only have one section of each seciton type 
            if (settings?.menu) {
                let isThereAMenuLink: boolean = false;

                settings.menu.forEach((menuLink) => {
                    if (menuLink.children === typeSection) isThereAMenuLink = true;
                });

                if (isThereAMenuLink) return res.status(400).send({
                    message: `you cannot create more than one section of the type ${typeSection} for a settings`,
                })
            }

            if (owner) data.owner = owner.name;

            // it will check the files attached to the request body (only home and about section has files)
            if (typeSection === "home" || typeSection === "about") {
                
                if (!req.files) return res.status(400).send({
                    message: `you must upload a image for ${typeSection === "home" ? "the background" : "your profile"}`,
                })
                
                const files = req.files as { [fieldname: string]: Express.Multer.File[] };

                if (typeSection === "home") {

                    if (!files["backgroundImg"] || files["backgroundImg"].length === 0) return res.status(400).send({
                        message: `you must upload a background image`,
                    });

                    data.backgroundImg = files["backgroundImg"][0].path;

                } else if (typeSection === "about") {

                    if (!files["picture"] || files["picture"].length === 0) return res.status(400).send({
                        message: "you must upload a profile picture",
                    });

                    data.biosData = JSON.parse(data.biosData);
                    data.biosData.profilePhoto.srcImg = files["picture"][0].path;
                    
                }
                
            }

            let sanitated;

            // it will validate the request body
            try{
                
                // the method validate will throw an error telling what is wrong in the request body that will be catched and will be sent to the client
                sanitated = SectionController.validate(typeSection, data);

            } catch (err){
                const { message } = err as Error;
                return res.status(400).send({
                    message: message,
                });
            }
            
            sanitated.settings = settings;
            const section = await SectionRepository.create(sanitated);

            if (section) {
                if (settings) {
                    settings?.menu?.push({
                        children: typeSection,
                        link: typeSection,
                        icon: typeSection,
                    });
                    await settings.save();
                }
            }

            res.status(201).send({
                section,
            })

        } catch (err) {
            console.log("[server]: error: ",err);

            res.status(500).send({
                message: "internal error",
            });
        }
    }

    // get a section by it's id
    static async getById(id: string) {

        const section = await SectionRepository.getById(id);

        return section;

    }

    // get all sections attached to a settings id
    static async getAllBySettingsId(settingsId: string) {

        const sections = await SectionRepository.getAllBySettingsId(settingsId);

        return sections;

    }

    // get al by users id
    static async getAll(req: Request, res: Response) {

        try {
            const sections = await SectionRepository.getAll();
    
            if (!sections) return res.status(404).send({
                message: "no sections were found it"
            });

            return res.status(200).send(sections);

        } catch (err) {
            console.log(err);
            res.status(501).send({
                message: "internal error",
            })
            return;
        }
    }

    // a controller to callback getById or getAllBySettingsId
    static async getByParams(req: Request, res: Response) {

        try {
            if (req.params.settingsId) {

                const { settingsId } = req.params;

                const sections = await SectionController.getAllBySettingsId(settingsId);

                if (!sections || sections.length === 0) return res.status(404).send({
                    message: "no sections were found attached to this settings",
                });

                return res.status(200).send({
                    sections,
                });

            }

            if (req.params.id) {

                const { id } = req.params;

                const section = await SectionController.getById(id);

                if (!section) return res.status(404).send({
                    message: "no section was found it",
                });

                return res.status(200).send(section)
            }

        } catch (err) {
            console.log(`[server]: error: `,err);
            res.send({
                message: "internal error",
            });

        }

    }

    // update a section
    static async update(req: Request, res: Response) {
        const { id } = req.params;
        
        const data = req.body;

        const typeSection: "home" | "about" | "projects" | "other" | "skills" = req.body.typeSection;

        try{
            // getting section by id
            const section = await SectionController.getById(id);

            if (!section) return res.status(404).send({
                message: "section not found it",
            });

            let newData: ISection | IHomeSection | ISkillsSection | IProjectsSection | IAboutSection;
            try{
            
                // it will validate de request body, if the field is invalid it will throw an error that will be catched
                newData = SectionController.validate(typeSection, data);

            } catch (err) {
                const { message } = err as Error;
                return res.status(400).send({
                    message: message,
                });
            }

            await SectionRepository.update(newData, section);

            return res.status(204).send({
                message: `${section.title} was successfully updated`
            });

        } catch(err) {
            console.log("[server]: error:",err);
            res.status(500).send({
                message: "internal error",
            });
        }
    }

    // validate the section's props by it's types.
    static validate(typeSection: string, data: ICreateSectionData): IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection {

        let sanitated: IHomeSection | IAboutSection | ISkillsSection | IProjectsSection | ISection;
        switch (typeSection) {
            case "home":
                sanitated = HomeSectionValidator.validate(data);
                break;
            case "about":
                sanitated = AboutSectionValidator.validate(data);
                break;
            case "skills":
                sanitated = SkillsSectionValidator.validate(data);
                break;
            case "projects":
                sanitated = ProjectsSectionValidator.validate(data);
                break;
            default:
                const {
                    title,
                    children,
                    background,
                    backgroundImg,
                    icon,
                } = data;

                sanitated = {
                    title,
                    icon,
                    children,
                    background,
                    backgroundImg,
                }
                break;
        }

        return sanitated;
    }
}