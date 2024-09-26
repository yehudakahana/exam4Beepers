import { Request, Response } from "express";
import { User } from "../models/types.js";
import { v4 as uuidv4 } from 'uuid';
import { writeUserToJsonFile, readUserFromJsonFile } from "../DAL/jsonUser.js";
import bcrypt from 'bcrypt';


export const register =async (req: Request, res: Response) => {
    try {
    const user : User = req.body
    user.id = uuidv4()
    user.password = bcrypt.hashSync(user.password, 10)
    user.bookes = [];

    await writeUserToJsonFile(user)
    res.status(201).json( {userid: user.id} )

    }
    catch (error) {
        res.status(500).send(error)
    }
}



export const login = async (req: Request, res: Response) => {
    try {
     const user : User = req.body
     const users : User[] = await readUserFromJsonFile()
    const foundUser = users.find(u => u.userName === user.userName && bcrypt.compareSync(user.password, u.password))
    if (!foundUser) {
        return res.status(401).send({ error: 'Invalid user or password' })
    }
    res.status(200).json({ userid : foundUser.id })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

