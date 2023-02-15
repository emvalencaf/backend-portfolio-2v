"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeSectionValidator {
    static validate(data) {
        const { owner, ocupation, mainStack, backgroundImg, } = data;
        if (!owner)
            throw new Error("your home section must have an owner");
        if (!ocupation)
            throw new Error("your home section must have your ocupation");
        if (!mainStack)
            throw new Error("your home section must have at least one of your code language");
        if (mainStack instanceof Array === false)
            throw new Error("your home section must have at least one of your code language");
        if ((mainStack === null || mainStack === void 0 ? void 0 : mainStack.length) === 0)
            throw new Error("your home section must have at least one of your code language");
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
