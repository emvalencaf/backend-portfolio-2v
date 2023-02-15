"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectsSectionValidator {
    static validate(data) {
        const { projects } = data;
        if (!projects)
            throw new Error("your project section must have projects attached");
        if (projects.length < 1)
            throw new Error("you must attach at least one project to your project section");
        return {
            title: "projects",
            icon: "projects",
            projects,
        };
    }
}
exports.default = ProjectsSectionValidator;
