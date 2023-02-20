import { ICreateSectionData, IProjectsSection } from "../../../../shared-type/sections";

export default class ProjectsSectionValidator{
    static validate(data: ICreateSectionData):IProjectsSection {
        
        if (!data.projects) throw new Error("your project section must have projects attached");
        
        const projects = JSON.parse(data.projects);

        if (projects.length < 1 ) throw new Error("you must attach at least one project to your project section")

        return {
            title: "projects",
            icon: "projects",
            projects,
        };
    }
}