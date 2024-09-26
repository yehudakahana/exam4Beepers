import { Request, Response } from "express";
import { Beeper, BeeperStatus } from "../models/types.js";
import { v4 as uuidv4 } from 'uuid';
import {  readBeepersFromJsonFile, writeAllToJson, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";
import { createNewBeeper, updateBeeperStatus, isInLebanon , openTimer} from "../services/beeperService.js";





export const createBeeper = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name;
        if (!name) {
            res.status(400).send('Name is required');
            return;
        }
        const beepers: Beeper[] = await readBeepersFromJsonFile();
        if (beepers.find(b => b.name === name)) {
            res.status(400).send('Beeper already exists');
            return;
        }
        const newBeeper: Beeper = await createNewBeeper(name);
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
        let beepers: Beeper[] = await readBeepersFromJsonFile();
        let beeper: Beeper | undefined = beepers.find(b => b.id === id);
        if (!beeper) {
            res.status(404).send('Beeper not found');
        }
        //אם קיים ביפר
        else {
                beeper = await updateBeeperStatus(beeper);
            
           if (beeper.status === BeeperStatus.DEPLOYED) {
                const latitude: number = Number(req.body.latitude);
                const longitude: number = Number( req.body.longitude);
                //אם לא סיפק קואורדינטות יקבל שגיאה
                if (!latitude || !longitude) {
                    res.status(400).send('Latitude and longitude are required');
                    return
                }
                
                let isLebanon = await isInLebanon(latitude, longitude);
                //אם לא בלבנון יקבל שגיאה
                if (!isLebanon) {
                    res.status(400).send('Beeper is not in Lebanon');
                    return
                }
                beeper.latitude = latitude;
                beeper.longitude = longitude;
                await writeAllToJson(beepers);

                //מתחיל בתהליך הפיצוץ...
                beepers = await readBeepersFromJsonFile();
                beeper  =  beepers.find(b => b.id === id);
                beeper =  await openTimer(beeper!);
                await writeAllToJson(beepers);
        }
        //אם הסטטוס לא deployed
        else {
            await writeAllToJson(beepers);
        }
        
        res.status(200).json(beeper);
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







