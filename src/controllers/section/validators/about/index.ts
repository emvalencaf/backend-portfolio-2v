import { IAboutSection, IBiosData, ICreateSectionData, IEducation, IWork } from "../../../../shared-type/sections";

export default class AboutSectionValidator {
    static validate(data: ICreateSectionData): IAboutSection {
        const {
            biosData,
            urlDownload,
        } = data;

        
        // biosData validation
        if (!biosData) throw new Error("your about section must have some bios data ");
        
        AboutSectionValidator.validateBiosData(biosData);

        // educationData validation
        if (!data.educationData) throw new Error("your about section must have some education data");

        const educationData =  typeof data.educationData === "string" ?  JSON.parse(data.educationData) : data.educationData;

        if (!educationData.courses && !educationData.higherEducation) throw new Error("your about section must have at some of your education data");

        if (educationData.courses.length >= 1) {
            educationData.courses.forEach(AboutSectionValidator.validateCourseData);
        }

        if (educationData.higherEducation.length >= 1) {
            educationData.higherEducation.forEach(AboutSectionValidator.validateCourseData);
        }

        if (!data.workData) throw new Error("your about section must have some work data");

        const workData = typeof data.workData === "string" ? JSON.parse(data.workData) : data.workData;

        if(workData.workExperience.length >= 1) {
            workData.workExperience.forEach(AboutSectionValidator.validateWorkData);
        }

        if (!urlDownload) throw new Error("your about section must have a link to your cv");

        return {
            title: "about",
            icon: "about",
            biosData,
            educationData,
            workData,
            urlDownload,
        }

    }

    static validateBiosData(biosData: IBiosData | undefined) {

        if (!biosData) throw new Error("your about section must have some bios data ");

        if (!biosData.bios) throw new Error("your about section must have a resume bios about yourself");

        if (biosData.bios.length > 1000) throw new Error("your about section resume bios must be limited to 1000 characteres");

        if (!biosData.profilePhoto || !biosData.profilePhoto?.srcImg || !biosData.profilePhoto?.altText) throw new Error("your about section must have an profile photo of you");
    }

    static validateCourseData(course: IEducation) {
        if (!course.title) throw new Error("one of yours courses doesn't have a title");

        if (course.title.length > 50) throw new Error("one of your courses title has more than 50 characters");

        if (!course.institution) throw new Error(`your ${course.title} course doesn't have an institution`);

        if (course.institution.length > 50) throw new Error(`your ${course.title} course institution name has more than 150 characters`);

        if (!course.resume) throw new Error(`your ${course.resume} course doesn't have a resume`);

        if (course.resume.length > 250) throw new Error(`your ${course.title} course resume has more than 250 characters`);

        if (!course.startIn) throw new Error(`your ${course.title} course doesn't have started date`);

        if (!course.workTime) throw new Error(`your ${course.title} course dosen't have a work time`);

        if (typeof course.workTime === "string" && course.workTime.length > 50) throw new Error(`your ${course.title} course has more than 50 characters`)

    }

    static validateWorkData(work: IWork) {
        if (!work.employer) throw new Error("one of yours work experience doesn't have an employer");

        if (work.employer.length > 50) throw new Error(`your work experience at ${work.employer}'s employer name does have more than 50 characters`);

        if (!work.jobDescription) throw new Error(`your work experience at ${work.employer} doesn't have a job description`);
        
        if (work.jobDescription.length > 250) throw new Error(`your work experience at ${work.employer}'s job description does have more than 250 characters`);

        if (!work.startIn) throw new Error(`your work experience at ${work.employer} doesn't have a job description`);

        if (!work.ocupation) throw new Error(`your work experience at ${work.employer} doesn't have an ocupation`);

        if (work.ocupation.length > 50) throw new Error(`your work experience at ${work.employer}'s ocupation does have more than 50 characters`);

    }
}