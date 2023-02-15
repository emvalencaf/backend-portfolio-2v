"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SkillsSectionValidator {
    static validate(data) {
        const { techs } = data;
        if (!techs)
            throw new Error("your skills sections must have tech data attached");
        techs.forEach(SkillsSectionValidator.validateTech);
        return {
            title: "skills",
            icon: "skills",
            techs,
        };
    }
    static validateTech(data) {
        if (!data.techName)
            throw new Error(`one of yours tech doesn't have an name`);
        if (data.techName.length > 50)
            throw new Error(`your ${data.techName} does have a name with more than 50 characters`);
        if (!data.techDescription)
            throw new Error(`your ${data.techDescription} doesn't have a description`);
        if (data.techDescription.length > 250)
            throw new Error(`your ${data.techDescription} does have a description with more than 250 characters`);
    }
}
exports.default = SkillsSectionValidator;
