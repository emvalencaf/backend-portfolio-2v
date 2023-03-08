// types
import { ICreateSectionData, IHomeSection } from "../../../../shared-type/sections";

export default class HomeSectionValidator {
    static validate(data: ICreateSectionData): IHomeSection {
        const { 
            owner, 
            ocupation,
            backgroundImg,
        } = data;
        
        if (!data.mainStack) throw new Error("your home section must have at least one of your code language");
        
        const mainStack  =  typeof data.mainStack === "string" ? JSON.parse(data.mainStack): data.mainStack;

        if (mainStack instanceof Array === false) throw new Error("your home section must have at least one of your code language");

        if (mainStack?.length === 0) throw new Error("your home section must have at least one of your code language");

        if (!owner) throw new Error("your home section must have an owner");

        if (!ocupation) throw new Error("your home section must have your ocupation");

        if (ocupation.length === 50) throw new Error("your ocupation cannot have more than 50 characters");


        return {
            title: "home",
            owner,
            ocupation,
            mainStack,
            icon: "home",
            backgroundImg,
        }
    }
}