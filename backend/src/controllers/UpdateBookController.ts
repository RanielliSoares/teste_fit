import { Response, Request } from "express";
import { UpdateBookService } from "../services/UpdateBookService";


class UpdateBookController {
    async handle(req: Request, res: Response) {
        const { id, title, author, publication_date, description } = req.body;

        const updateBookService = new UpdateBookService();

        const book = await updateBookService.execute({
            id,
            title,
            author,
            description,
            publication_date: new Date(publication_date),
            picture_url: req.file?.filename,
        });

        return res.status(200).json(book);
    }
}

export { UpdateBookController };

