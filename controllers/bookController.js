var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readUserFromJsonFile, writeAllToJson } from "../DAL/jsonUser.js";
import { addBookFromApi } from "../services/openLibraryAPI.js";
export const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.userid) {
            throw new Error('userid is required');
        }
        const userId = req.query.userid;
        const users = yield readUserFromJsonFile();
        const user = users.find(u => u.id === userId);
        res.status(200).json(user.bookes);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId.trim();
        const bookName = req.body.bookName;
        const book = yield addBookFromApi(bookName);
        const users = yield readUserFromJsonFile();
        const user = users.find(u => u.id === userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            return res.status(404).send('User not found');
        }
        const bookExists = user.bookes.some(b => b.title.trim().toLowerCase() === book.title.trim().toLowerCase());
        if (bookExists) {
            return res.status(400).send('Book already exists');
        }
        user.bookes.push(book);
        yield writeAllToJson(users);
        res.status(201).json({ bookid: book.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId.trim();
        const bookId = req.params.bookId.trim();
        const users = yield readUserFromJsonFile();
        const user = users.find(u => u.id === userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            return res.status(404).send('User not found');
        }
        const book = user.bookes.find(b => b.id === bookId);
        if (!book) {
            console.log(`Book with ID ${bookId} not found`);
            return res.status(404).send('Book not found');
        }
        book.title = req.body.updatedData.title;
        book.author = req.body.updatedData.author;
        book.id = bookId;
        yield writeAllToJson(users);
        res.status(200).json({ message: 'Book updated successfully' });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
export const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId.trim();
        const bookId = req.params.bookId.trim();
        const users = yield readUserFromJsonFile();
        const user = users.find(u => u.id === userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            return res.status(404).send('User not found');
        }
        const book = user.bookes.find(b => b.id === bookId);
        if (!book) {
            console.log(`Book with ID ${bookId} not found`);
            return res.status(404).send('Book not found');
        }
        const index = user.bookes.indexOf(book);
        user.bookes.splice(index, 1);
        yield writeAllToJson(users);
        res.status(200).json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
