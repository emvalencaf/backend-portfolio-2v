// types
import { ICreateSectionData, IHomeSection } from "../../../../shared-type/sections";

export default class HomeSectionValidator {
    static validate(data: ICreateSectionData): IHomeSection {
        const { 
            owner, 
            ocupation, 
            mainStack,
            backgroundImg,
        } = data;

        if (!owner) throw new Error("your home section must have an owner");

        if (!ocupation) throw new Error("your home section must have your ocupation");

        if (!mainStack) throw new Error("your home section must have at least one of your code language");

        if (mainStack instanceof Array === false) throw new Error("your home section must have at least one of your code language");

        if (mainStack?.length === 0) throw new Error("your home section must have at least one of your code language");

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