import { ICreateSectionData, IProjectsSection } from "../../../../shared-type/sections";

export default class ProjectsSectionValidator{
    static validate(data: ICreateSectionData):IProjectsSection {
        const {

            projects
        } = data;

        if (!projects) throw new Error("your project section must have projects attached");

        if (projects.length < 1 ) throw new Error("you must attach at least one project to your project section")

        return {
            icon: "projects",
            projects,
        };
    }
}