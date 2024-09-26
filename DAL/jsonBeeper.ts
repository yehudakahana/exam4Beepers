import jsonfile from 'jsonfile';
import { Beeper, BeeperStatus } from '../models/types.js';

const file: string = './data/db.json';





//כתיבת כל המערך לתוך הקובץ json
export const writeAllToJson = async (beepers: Beeper[]) => {
        await jsonfile.writeFile(file, beepers, { spaces: 2 }); 
        console.log(" all beepers written to file successfully");
}



// פונקציה לקריאה מקובץ JSON
export const readBeepersFromJsonFile = async (): Promise<Beeper[]> => { 
        const beepers: Beeper[] = await jsonfile.readFile(file); 
        return beepers;
   
};




// פונקציה לכתיבה לקובץ JSON
export const writeBeeperToJsonFile = async (beeper: Beeper) => {

        const beepers: Beeper[] = await jsonfile.readFile(file); 
        beepers.push(beeper);

        await jsonfile.writeFile(file, beepers, { spaces: 2 }); 
        console.log("beeper written to file successfully");
   
};
