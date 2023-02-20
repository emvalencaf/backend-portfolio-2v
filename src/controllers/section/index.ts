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
    static async create(req: Request, res: Response) {
        
        try {
            // get the type by params
            const { typeSection } = req.params;
            const data = req.body;
            
            if (!req.user) return;

            const { id } = req.user;
            
            const owner = await UserController.getById(res, id, false);
            
            if (!data.settings) return res.status(400).send({
                message: "you must choose a setting to attached a section"
            });

            const settings = await SettingsController.getById(data.settings);

            if (!settings) return res.status(404).send({
                message: "settings not found it"
            });

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

            if (typeSection === "home" || typeSection === "about") {
                console.log("check home or about section images");
                if (!req.files) return res.status(400).send({
                    message: `you must upload a image for ${typeSection === "home" ? "the background" : "your profile"}`,
                })
                
                const files = req.files as {[fieldname: string]: Express.Multer.File[]};;
                
                if (typeSection === "home") data.backgroundImg = files["backgroundImg"][0]?.path;
                
                data.biosData = JSON.parse(data.biosData);
                if (typeSection === "about") {
                    data.biosData.profilePhoto.srcImg = files["picture"][0]?.path;
                    data.biosData.profilePhoto.altText = `profile picture`;
                }
            }

            const sanitated = SectionController.validate(typeSection, data);
            
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
            console.log(err);
        }
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) return res.status(400).send({
            message: "you must inform an id",
        });

        try {

            const section = await SectionRepository.getById(id);

            if (!section) return res.status(404).send({
                message: "section not found it"
            })

            res.status(200).send({
                section,
            })

        } catch(err) {
            console.log(err);
            return res.send(500).send({
                message: "internal error"
            });
        }

    }

    static async getAllBySettingIds(req: Request, res: Response) {
        const { settingsId } = req.params;

        if (!settingsId) return res.status(400).send({
            message: "you must selected a settings id to fetch that data"
        });

        try{

            const sections = await SectionRepository.getAllBySettingsId(settingsId);

            if (!sections) return res.status(404).send({
                message: `no sections were found attached to the settings selected`
            })

            res.status(200).send({
                sections,
            })

        } catch(err){
            console.log(err);
            return res.send(500).send(({
                message: "internal error"
            }));
        }

    }

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