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
//כתיבת כל המערך לתוך הקובץ json
export const writeAllToJson = (beepers) => __awaiter(void 0, void 0, void 0, function* () {
    yield jsonfile.writeFile(file, beepers, { spaces: 2 });
    console.log(" all beepers written to file successfully");
});
// פונקציה לקריאה מקובץ JSON
export const readBeepersFromJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(file);
    return beepers;
});
// פונקציה לכתיבה לקובץ JSON
export const writeBeeperToJsonFile = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(file);
    beepers.push(beeper);
    yield jsonfile.writeFile(file, beepers, { spaces: 2 });
    console.log("beeper written to file successfully");
});
