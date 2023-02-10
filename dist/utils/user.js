"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserUtils {
    static removePassword(user) {
        if (user === null || user === void 0 ? void 0 : user.password)
            user === null || user === void 0 ? true : delete user.password;
        return user;
    }
    ;
}
exports.default = UserUtils;
