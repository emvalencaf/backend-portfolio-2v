// models
import ModelPortfolio from "../../models/portfolio";

export default class PortfolioRepository{
    static async get(id?: string) {

        if (id) return await ModelPortfolio.findById(id).populate("owner");

        return await ModelPortfolio.find({}).populate("owner");
    }

    static async find() {
        return await ModelPortfolio.find({});
    }

}