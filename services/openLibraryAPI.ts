import axios from "axios";
import { User, Book } from "../models/types.js";
import { v4 as uuidv4 } from 'uuid';





export const addBookFromApi = async (bookName: string): Promise<Book> => {

    const response = await axios.get(`https://freetestapi.com/api/v1/books?search=${bookName}`);
    const book: Book = {
        title: bookName, 
        author: response.data[0].author, 
        id: uuidv4() 
    };
    
    return book;
}
   