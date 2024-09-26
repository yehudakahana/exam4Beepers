import jsonfile from 'jsonfile';
import { User } from '../models/types.js';

const file: string = './data/db.json';

// פונקציה לכתיבה לקובץ JSON
export const writeUserToJsonFile = async (user: User) => {

        const users: User[] = await jsonfile.readFile(file); 
        users.push(user);

        await jsonfile.writeFile(file, users, { spaces: 2 }); 
        console.log("User written to file successfully");
   
};


export const writeAllToJson = async (users: User[]) => {

        await jsonfile.writeFile(file, users, { spaces: 2 }); 
        console.log(" all Users written to file successfully");
}



// פונקציה לקריאה מקובץ JSON
export const readUserFromJsonFile = async (): Promise<User[]> => { 
    
        const users: User[] = await jsonfile.readFile(file); 
        return users;
   
};
