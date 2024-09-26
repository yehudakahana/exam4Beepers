var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
const file = './data/db.json';
// פונקציה לכתיבה לקובץ JSON
export const writeUserToJsonFile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield jsonfile.readFile(file);
    users.push(user);
    yield jsonfile.writeFile(file, users, { spaces: 2 });
    console.log("User written to file successfully");
});
export const writeAllToJson = (users) => __awaiter(void 0, void 0, void 0, function* () {
    yield jsonfile.writeFile(file, users, { spaces: 2 });
    console.log(" all Users written to file successfully");
});
// פונקציה לקריאה מקובץ JSON
export const readUserFromJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield jsonfile.readFile(file);
    return users;
});
