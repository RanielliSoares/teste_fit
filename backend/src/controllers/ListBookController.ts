import { Request, Response, NextFunction } from "express";
import { ListBookService } from "../services/ListBookService";

class ListBookController {
    async handle(req: Request, res: Response, next: NextFunction) {

        const listBookService = new ListBookService();


        const books = await listBookService.execute();
        return res.json(books);



    }
}
export { ListBookController };