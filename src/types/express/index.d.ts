import { UserFrontEnd } from "../../shared-type/user";

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: UserFrontEnd;
        }
    }
}