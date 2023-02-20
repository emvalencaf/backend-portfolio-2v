"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectsSectionValidator {
    static validate(data) {
        if (!data.projects)
            throw new Error("your project section must have projects attached");
        const projects = JSON.parse(data.projects);
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
