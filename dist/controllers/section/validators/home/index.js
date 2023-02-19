"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeSectionValidator {
    static validate(data) {
        const { owner, ocupation, backgroundImg, } = data;
        if (!data.mainStack)
            throw new Error("your home section must have at least one of your code language");
        const mainStack = JSON.parse(data.mainStack);
        if (mainStack instanceof Array === false)
            throw new Error("your home section must have at least one of your code language");
        if ((mainStack === null || mainStack === void 0 ? void 0 : mainStack.length) === 0)
            throw new Error("your home section must have at least one of your code language");
        if (!owner)
            throw new Error("your home section must have an owner");
        if (!ocupation)
            throw new Error("your home section must have your ocupation");
        if (ocupation.length === 50)
            throw new Error("your ocupation cannot have more than 50 characters");
        return {
            title: "home",
            owner,
            ocupation,
            mainStack,
            icon: "home",
            backgroundImg,
        };
    }
}
exports.default = HomeSectionValidator;
