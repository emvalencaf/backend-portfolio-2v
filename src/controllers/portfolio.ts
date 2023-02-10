// repository
import PortfolioRepository from "../repository/portfolio";

// types
import { Request, Response } from "express";

export default class PortfolioController {
    static async get(req:Request, res:Response) {
        try{

            const response = await PortfolioRepository.get();

            res.status(200).send(response);

        } catch(e) {
            res.status(404).send({message: "error 404", err: e});
        }
    }
}