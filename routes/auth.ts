import  Express, { Router }  from "express";
import { login, register } from "../controllers/authController.js";
import { getBooks, addBook, updateBook, deleteBook} from "../controllers/bookController.js";

const router : Router = Express.Router();



router.route("/register").post(register);
router.route("/login").post(login);

router.route("/books").get(getBooks);
router.route("/books").post(addBook);
router.route("/books/:bookId").put(updateBook);
router.route("/books/:bookId").delete(deleteBook);

export default router;