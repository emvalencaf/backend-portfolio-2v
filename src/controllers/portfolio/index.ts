// repository
import PortfolioRepository from "../../repository/portfolio";

// types
import { Request, Response } from "express";

// controllers
import SectionController from "../section";
import SettingsController from "../settings";

export default class PortfolioController {
    static async create(req: Request, res: Response) {
        const { settingsId } = req.params;

        try{
            
            const portfolios = await PortfolioController.find();

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
}