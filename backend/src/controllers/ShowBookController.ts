import { Request, Response, NextFunction } from "express";
import { ShowBookService } from "../services/ShowBookService";

interface ShowBookControllerProps {
    id: string;
}

class ShowBookController {
    async handle(req: Request<ShowBookControllerProps>, res: Response, next: NextFunction) {

        const { id } = req.params;
        const showBookService = new ShowBookService();

        const book = await showBookService.execute({ id });
        return res.json(book);

    }
}
export { ShowBookController };