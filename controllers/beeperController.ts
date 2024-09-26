import { Request, Response } from "express";
import { Beeper, BeeperStatus } from "../models/types.js";
import { v4 as uuidv4 } from 'uuid';
import {  readBeepersFromJsonFile, writeAllToJson, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";
import { stat } from "fs";





export const createBeeper = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name;
        const newBeeper: Beeper = {
            id: uuidv4(),
            name: name,
            status: BeeperStatus.MANUFACTURED,
            created_at: new Date(),
            detonated_at: null,
            latitude: 0,
            longitude: 0
        };

        const beepers: Beeper[] = await readBeepersFromJsonFile();
        beepers.push(newBeeper);
        await writeAllToJson(beepers);

        res.status(201).json(newBeeper);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}





export const getAllBeepers = async (req: Request, res: Response) => {
    try {
        const beepers: Beeper[] = await readBeepersFromJsonFile();
        res.status(200).json(beepers);

    }
    catch (error) {
        res.status(500).send(error);
    }
}



export const getBeeperById = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const beepers: Beeper[] = await readBeepersFromJsonFile();
        const beeper: Beeper | undefined = beepers.find(b => b.id === id);
        if (!beeper) {
            res.status(404).send('Beeper not found');
        }
        else {
            res.status(200).json(beeper);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}


export const getBeepersByStatus = async (req: Request, res: Response) => {
    try {
        const status: string = req.params.status;
        const beepers: Beeper[] = await readBeepersFromJsonFile();
        const filterdBeepers: Beeper[] = beepers.filter(b => b.status === status);
        if (filterdBeepers.length === 0) {
            res.status(404).send('Beeper not found');
        }
        else {
            res.status(200).json(filterdBeepers);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}



export const updateBeeper = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const beepers: Beeper[] = await readBeepersFromJsonFile();
        const index = beepers.findIndex(b => b.id === id);
        if (index === -1) {
            res.status(404).send('Beeper not found');
        }
        else {
            const status: string = beepers[index].status;
            beepers[index].status = status === BeeperStatus.MANUFACTURED ? BeeperStatus.DETONATED : BeeperStatus.MANUFACTURED;
            await writeAllToJson(beepers);
            res.status(200).json({ message: 'Beeper updated successfully' });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}



export const deleteBeeper = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const beepers: Beeper[] = await readBeepersFromJsonFile();
        const index = beepers.findIndex(b => b.id === id);
        if (index === -1) {
            res.status(404).send('Beeper not found');
        }
        else {
            beepers.splice(index, 1);
            await writeAllToJson(beepers);
            res.status(200).json({ message: 'Beeper deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}






// export const updateBook  = async (req: Request, res: Response) => {
//     try {
//         const userId: string = req.body.userId.trim();
//         const bookId: string = req.params.bookId.trim();
//         const users: User[] = await readUserFromJsonFile();

//         const user: User | undefined = users.find(u => u.id === userId);
//         if (!user) {    
//             console.log(`User with ID ${userId} not found`);
//             return res.status(404).send('User not found');
//         }

//         const book: Book | undefined = user.bookes!.find(b => b.id === bookId);
//         if (!book) {
//             console.log(`Book with ID ${bookId} not found`);
//             return res.status(404).send('Book not found');
//         }

//         book.title = req.body.updatedData.title;
//         book.author = req.body.updatedData.author;
//         book.id = bookId;

//         await writeAllToJson(users);
//         res.status(200).json({ message: 'Book updated successfully' });

//     }
//     catch (error) {
//         res.status(500).send(error);
//     }       
// }





