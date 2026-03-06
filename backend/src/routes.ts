import { Router } from "express";
import { validateSchema } from "./middlewares/validateSchema";
import multer from "multer";
import uploadConfig from "./config/multer";

import { ListBookController } from "./controllers/ListBookController";
import { CreateBookController } from "./controllers/CreateBookController";
import { ShowBookController } from "./controllers/ShowBookController";
import { UpdateBookController } from "./controllers/UpdateBookController";
import { DeleteBookController } from "./controllers/DeleteBookController";
import { listBooksSchema, updateBookSchema, deleteBooksSchema, createBookSchema } from "./schemas/BookSchema";

const router = Router();
const upload = multer(uploadConfig);


router.post("/books", upload.single("file"), new CreateBookController().handle);
router.get("/books", new ListBookController().handle);
router.get("/book/show", validateSchema(listBooksSchema), new ShowBookController().handle);
router.put("/book", upload.single("file"), validateSchema(updateBookSchema), new UpdateBookController().handle);
router.delete("/book", validateSchema(deleteBooksSchema), new DeleteBookController().handle);

export { router };