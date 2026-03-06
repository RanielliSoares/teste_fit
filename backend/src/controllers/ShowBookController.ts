import { Request, Response, NextFunction } from "express";
import { ShowBookService } from "../services/ShowBookService";

class ShowBookController {
    async handle(req: Request, res: Response, next: NextFunction) {

        const { id } = req.body;

        const showBookService = new ShowBookService();

        const book = await showBookService.execute({ id });
        return res.json(book);

    }
}
export { ShowBookController };