export default class HandleFile{
    static getUrlFromFile(requestFile: Express.Multer.File) {
        const { path } = requestFile;
    
        return path ? path : "";
    }
}