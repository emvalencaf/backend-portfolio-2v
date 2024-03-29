// types
import { Request, Response } from "express";
import { ISettings } from "../../shared-type/settings";
import SettingsRepository from "../../repository/settings";
import UserController from "../user";
import HandleFile from "../../utils/handleFile";
type Logo = Pick<ISettings, "logo">;
type Menu = Pick<ISettings, "menu">;

export default class SettingsController {
    static async create(req: Request, res: Response) {
        const { websiteName, favIcon, logo, socialMedia } = req.body;

        // user validation
        if (!req.user) return res.status(403).send({
            message: "you must be logged in for create a new portfolio"
        });

        // validations        
        if (!websiteName) return res.status(400).send({
            message: "you must fill a name for your portfolio"
        });

        if (!logo) return res.status(400).send({
            message: "you must fill a logo",
        });

        try {
            let files;
            if (req.files) files = req.files as { [fieldname: string]: Express.Multer.File[] };

            if (!files || !files["favIcon"] || files["favIcon"][0].originalname.match(/\.(ico)$/)) return res.status(400).send({
                message: "the favicon must be in .ico file",
            });

            const data = {
                websiteName,
                favIcon: HandleFile.getUrlFromFile(files["favIcon"][0]),
                logo: JSON.parse(logo),
                socialMedia: socialMedia && JSON.parse(socialMedia) || {},
            };

            if (files["logoImg"]) data.logo.srcImg = HandleFile.getUrlFromFile(files["logoImg"][0]);

            if (!data.favIcon) return res.status(400).send({
                message: "you must choose a favicon for your portfolio"
            });

            // logo validation
            if (!data.logo) return res.status(400).send({
                message: "you must fill logo fields"
            });

            if (!data.logo?.altText || !data.logo?.link) return res.status(400).send({
                message: "you must fill the altText and link fields"
            });


            const { id } = req.user;
            const owner = await UserController.getById(id, false);

            if (!owner) return res.status(404).send({
                message: "user not found it"
            });

            const newData = {
                owner,
                websiteName,
                favIcon: data.favIcon,
                logo: data.logo,
                socialMedia: data.socialMedia,
            };
            console.log(newData);


            const settings = await SettingsRepository.create(newData);

            settings.save();

            res.status(200).send({settings});

        } catch (err) {
            console.log("[server]: error: ", err);
            res.status(500).send({
                message: "internal error"
            });
        }

    }

    static async getAllSettings(req: Request, res: Response) {

        try {
            const settings = await SettingsRepository.find();

            if (!settings) return res.status(404).send({
                message: "no settings were found it",
            });

            res.status(200).send({
                settings
            });

            return;

        } catch (err) {
            console.log(`[server]: error : ${err}`);

            res.status(500).send({
                message: "internal error"
            });

            return;
        }

    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;

        const {
            websiteName,
            socialMedia,
            logo
        } = req.body;


        // user validation
        if (!req.user) return res.status(403).send({
            message: "you must be logged in for create a new portfolio"
        });

        // validations        
        if (!websiteName) return res.status(400).send({
            message: "you must fill a name for your portfolio"
        });

        if (!logo) return res.status(400).send({
            message: "you must fill a logo",
        });

        try {
            const settings = await SettingsController.getById(id);

            if (!settings) return res.status(404).send({
                message: "settings was not found it",
            });

            let files;
            const data = {
                websiteName,
                logo: JSON.parse(logo),
                favIcon: settings.favIcon,
                socialMedia: socialMedia && JSON.parse(socialMedia) || {},
            };
            
            if (req.files) files = req.files as { [fieldname: string]: Express.Multer.File[] };


            if (files) {
                if ((
                    !files["favIcon"] ||
                    files["favIcon"][0].originalname.match(/\.(ico)$/)
                    ) && !settings.favIcon) return res.status(400).send({
                    message: "the favicon must be in .ico file",
                });

                data.favIcon = files["favIcon"][0]? HandleFile.getUrlFromFile(files["favIcon"][0]) : settings.favIcon;
                
                if (files["logoImg"]) data.logo.srcImg = files["logoImg"][0]? HandleFile.getUrlFromFile(files["logoImg"][0]) : settings.logo.srcImg;

            }

            if (!data.favIcon) return res.status(400).send({
                message: "you must choose a favicon for your portfolio"
            });

            // logo validation
            if (!data.logo) return res.status(400).send({
                message: "you must fill logo fields"
            });

            if (!data.logo?.altText || !data.logo?.link) return res.status(400).send({
                message: "you must fill the altText and link fields"
            });


            const { id: userId } = req.user;
            const owner = await UserController.getById(userId, false);

            if (!owner) return res.status(404).send({
                message: "user not found it"
            });

            const newData = {
                owner,
                websiteName,
                favIcon: data.favIcon,
                logo: data.logo,
                socialMedia: data.socialMedia,
            };
            console.log(newData);


            await SettingsRepository.update(newData, settings);

            res.status(204).send({
                settings
            });

        } catch (err) {
            console.log("[server]: error: ", err);
            res.status(500).send({
                message: "internal error"
            });
        }

    }

    static async getById(id: string) {

        const settings = await SettingsRepository.getById(id);

        return settings;
    }

    static async getByParams(req: Request, res: Response) {

        const { id = "" } = req.params;

        try {

            if (id) {

                const settings = await SettingsController.getById(id);

                if (!settings) return res.status(404).send({
                    message: "settings not found it",
                });

                return res.status(200).send({
                    settings,
                })
            }

        } catch (err) {
            console.log("[server]: error: ", err);
            res.status(500).send({
                message: "internal error",
            })
        }
    }
}