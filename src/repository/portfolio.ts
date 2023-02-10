// models
import ModelPortfolio from "../models/portfolio";

export default class PortfolioRepository{
    static async get(id?: string) {

        if (id) return await ModelPortfolio.findById(id);

        return await ModelPortfolio.find({});
    }
}