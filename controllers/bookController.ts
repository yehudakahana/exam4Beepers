import { Request, Response } from "express";
import { User, Book } from "../models/types.js";
import {  readUserFromJsonFile, writeAllToJson } from "../DAL/jsonUser.js";
import { addBookFromApi } from "../services/openLibraryAPI.js";



export const getBooks = async (req: Request, res: Response) => {
    try {
        if (!req.query.userid) {
            throw new Error('userid is required');
        }

        const userId:  string = req.query.userid as string;
        const users: User[] = await readUserFromJsonFile();
        const user: User = users.find(u => u.id === userId) as User;
        res.status(200).json(user.bookes);
    }
    catch (error) {
        res.status(500).send(error);
    }
}




export const addBook = async (req: Request, res: Response) => {
    try {
        const userId: string = req.body.userId.trim(); 
        const bookName: string = req.body.bookName;
        const book: Book = await addBookFromApi(bookName);

        const users: User[] = await readUserFromJsonFile();

        const user: User | undefined = users.find(u => u.id === userId); 
        if (!user) {
            console.log(`User with ID ${userId} not found`); 
            return res.status(404).send('User not found');
        }

        const bookExists = user.bookes!.some(b => b.title.trim().toLowerCase() === book.title.trim().toLowerCase());
        if (bookExists) {
            return res.status(400).send('Book already exists'); 
        }
        
        user.bookes!.push(book);
        await writeAllToJson(users);
        res.status(201).json({ bookid: book.id });
    }
    catch (error) {
        console.error(error); 
        res.status(500).send('Internal Server Error');
    }
}




export const updateBook  = async (req: Request, res: Response) => {
    try {
        const userId: string = req.body.userId.trim();
        const bookId: string = req.params.bookId.trim();
        const users: User[] = await readUserFromJsonFile();

        const user: User | undefined = users.find(u => u.id === userId);
        if (!user) {    
            console.log(`User with ID ${userId} not found`);
            return res.status(404).send('User not found');
        }

        const book: Book | undefined = user.bookes!.find(b => b.id === bookId);
        if (!book) {
            console.log(`Book with ID ${bookId} not found`);
            return res.status(404).send('Book not found');
        }

        book.title = req.body.updatedData.title;
        book.author = req.body.updatedData.author;
        book.id = bookId;

        await writeAllToJson(users);
        res.status(200).json({ message: 'Book updated successfully' });

    }
    catch (error) {
        res.status(500).send(error);
    }       
}





export const deleteBook = async (req: Request, res: Response):Promise<any> => {
    try {
        const userId: string = req.body.userId.trim();
        const bookId: string = req.params.bookId.trim();
        const users: User[] = await readUserFromJsonFile();
        const user: User | undefined = users.find(u => u.id === userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            return res.status(404).send('User not found');
        }
        const book: Book | undefined = user.bookes!.find(b => b.id === bookId);
        if (!book) {
            console.log(`Book with ID ${bookId} not found`);
            return res.status(404).send('Book not found');
        }

        const index = user.bookes!.indexOf(book);
        user.bookes!.splice(index, 1);
        await writeAllToJson(users);
        res.status(200).json({ message: 'Book deleted successfully' });
    }    
    catch (error) {
        res.status(500).send(error);
    }
}
