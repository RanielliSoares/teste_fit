import { Request, Response, NextFunction } from "express";
import { CreateBookService } from "../services/CreateBookService";


class CreateBookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { title, author, description, publication_date } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Imagem do livro é obrigatória" });
        }
        const createBookService = new CreateBookService();

        const createBook = await createBookService.execute({
            title,
            author,
            description,
            publication_date,
            picture_url: req.file.filename,
        });
        return res.status(201).json(createBook);

    }
}

export { CreateBookController };