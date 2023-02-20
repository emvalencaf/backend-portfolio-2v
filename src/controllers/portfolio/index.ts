// repository
import PortfolioRepository from "../../repository/portfolio";

// types
import { Request, Response } from "express";

// controllers
import SectionController from "../section";
import SettingsController from "../settings";


export default class PortfolioController {
    static async create(req: Request, res: Response) {

        try{
            
            const portfolios = await PortfolioController.find();

            if (portfolios.length >= 1) return res.status(409).send({
                message: "there's already one portfolio in the database",
            });

            const { settingsId } = req.body;

            const settings = await SettingsController.getById(settingsId);

            if (!settings) return res.status(404).send({
                message: "no settings were found it",
            });

            const sections = await SectionController.getAllBySettingId(settingsId);

            if (sections.length === 0) return res.status(404).send({
                message: "no sections were found it attached to this settings",
            });

            const data = {
                settings,
                content: {
                    sections: sections,
                },
            }

            const portfolio = await PortfolioRepository.create(data);

            return res.status(201).send({
                portfolio,
            })

        } catch (err) {
           console.log(err);
           res.status(500).send({
            message: "internal error"
           });
        }

    }

    static async find() {
        
        return await PortfolioRepository.find();

    }

    static async get(req: Request, res: Response) {
        
        try {
            const portfolios = await PortfolioController.find();
    
            if (portfolios.length === 0) return res.status(404).send({
                message: "no portfolio were found it",
            });

            const portfolio = portfolios[0];

            return res.status(200).send({
                portfolio,
            })

        } catch (err) {
            console.log(err);

            res.status(500).send({
                message: "internal error",
            });
        }
    }
}