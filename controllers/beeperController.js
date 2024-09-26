var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BeeperStatus } from "../models/types.js";
import { readBeepersFromJsonFile, writeAllToJson } from "../DAL/jsonBeeper.js";
import { createNewBeeper, updateBeeperStatus, isInLebanon, openTimer } from "../services/beeperService.js";
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const beepers = yield readBeepersFromJsonFile();
        if (beepers.find(b => b.name === name)) {
            res.status(400).send('Beeper already exists');
            return;
        }
        const newBeeper = yield createNewBeeper(name);
        beepers.push(newBeeper);
        yield writeAllToJson(beepers);
        res.status(201).json(newBeeper);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield readBeepersFromJsonFile();
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
export const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const beepers = yield readBeepersFromJsonFile();
        const beeper = beepers.find(b => b.id === id);
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
});
export const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const beepers = yield readBeepersFromJsonFile();
        const filterdBeepers = beepers.filter(b => b.status === status);
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
});
export const updateBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let beepers = yield readBeepersFromJsonFile();
        let beeper = beepers.find(b => b.id === id);
        if (!beeper) {
            res.status(404).send('Beeper not found');
        }
        else {
            beeper = yield updateBeeperStatus(beeper);
            yield writeAllToJson(beepers);
            if (beeper.status === BeeperStatus.DEPLOYED) {
                const latitude = Number(req.body.latitude);
                const longitude = Number(req.body.longitude);
                let isLebanon = yield isInLebanon(latitude, longitude);
                if (!isLebanon) {
                    res.status(400).send('Beeper is not in Lebanon');
                    return;
                }
                beeper.latitude = latitude;
                beeper.longitude = longitude;
                yield writeAllToJson(beepers);
                beepers = yield readBeepersFromJsonFile();
                beeper = beepers.find(b => b.id === id);
                console.log("mmmmmmm");
                beeper = yield openTimer(beeper);
                beeper.detonated_at = new Date();
                yield writeAllToJson(beepers);
            }
            res.status(200).json(beeper);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
export const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const beepers = yield readBeepersFromJsonFile();
        const index = beepers.findIndex(b => b.id === id);
        if (index === -1) {
            res.status(404).send('Beeper not found');
        }
        else {
            beepers.splice(index, 1);
            yield writeAllToJson(beepers);
            res.status(200).json({ message: 'Beeper deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
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
