import { Request, Response, NextFunction } from "express";
import { DeleteBookService } from "../services/DeleteBookService";

class DeleteBookController {
    async handle(req: Request, res: Response, next: NextFunction) {

        const { id } = req.body;

        const deleteBookService = new DeleteBookService();

        const deletedBook = await deleteBookService.execute({ id });
        return res.status(200).json(deletedBook);

    }
}

export { DeleteBookController };