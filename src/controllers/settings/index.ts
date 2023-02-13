// types
import { Request, Response } from "express";
import { ISettings } from "../../models/settings";
import SettingsRepository from "../../repository/settings";
import UserController from "../user";
type Logo = Pick<ISettings, "logo">;
type Menu = Pick<ISettings, "menu">;

export default class SettingsController {
    static async create(req: Request, res: Response) {
        const { websiteName, favIcon, logo, menu } = req.body;
        
        // user validation
        if (!req.user) return res.status(403).send({
            message: "error 403: forbidden access you must be logged in for create a new portfolio"
        });

        // validations        
        if (!websiteName) return res.status(400).send({
            message: "error 400: bad request you must fill a name for your portfolio"
        });
        
        if (!favIcon) return res.status(400).send({
            message: "error 400: bad request you must choose a favicon for your portfolio"
        });
        
        // menu validation
        if (!menu) return res.status(400).send({
            message: "error 400: bad request you must fill menu fields"
        });

        if (menu.length === 0) return res.status(400).send({
            message: "error 400: bad request you must fill at leat one menu link"
        });
        
        const arr = [];
        
        menu.forEach((menuLink: {
            link: string;
            children: string;
            icon?: "home" | "about" | "skills" | "projects";
            newTab?: boolean;
        }) => {
            if (!menuLink?.link) return arr.push({
                ...menuLink
            });
            
            if (!menuLink?.children) return arr.push({
                ...menuLink
            });
        });
        
        if (arr.length >= 1) return res.status(400).send({
            message: "error 400: bad request you must fill correctly the menu links"
        });
        
        // logo validation
        if (!logo) return res.status(400).send({
            message: "error 400: bad request you must fill logo fields"
        });

        if (!logo?.altText || !logo?.link) return res.status(400).send({
            message: "error 400: bad request you must fill the altText and link fields"
        });
        

        const { id } = req.user;
        const owner = await UserController.getById(res, id, false);

        if (!owner) return res.status(404).send({
            message: "error 404: user not found it"
        });

        const newData = {
            owner,
            websiteName,
            favIcon,
            logo,
            menu,
        };

        try{

            const settings = await SettingsRepository.create(newData);

            res.status(200).send(settings);

        } catch(err) {
            console.log("[server]: error", err);
            res.status(500).send({
                message: "error 500: internal error"
            });
        }

        res.status(200).send(newData);

    }

    static async getAllSettings(req: Request, res: Response) {

        try{

            const settings = await SettingsRepository.find();

            res.status(200).send(settings);

        } catch(err){
            console.log(`[server]: error ${err}`);

            res.status(500).send({
                message: "error 500: internal error"
            });
        }

    }

    static async getById(id: string) {
        try{

            return await SettingsRepository.getById(id);

        } catch(err) {
            console.log("[server]: error ", err);
        }
    }
}