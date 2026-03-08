import prismaClient from "../prisma";
import path from "path";
import fs from "fs";

interface UpdateBookServiceProps {
    id: string;
    title: string;
    author: string;
    description: string;
    publication_date: Date;
    picture_url?: string;
}

class UpdateBookService {
    async execute({ id, title, author, description, publication_date, picture_url }: UpdateBookServiceProps) {

        const bookAlreadyExists = await prismaClient.book.findUnique({
            where: { id }
        });

        if (!bookAlreadyExists) {
            throw new Error("Livro não encontrado");
        }

     
        let pictureUrl: string | undefined;

        if (picture_url) {
            if (bookAlreadyExists.picture_url) {
                const oldFilename = bookAlreadyExists.picture_url.split('/uploads/')[1];
                if (oldFilename) {
                    const oldFilePath = path.resolve(__dirname, '..', 'uploads', oldFilename);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
            }

            const appUrl = process.env.APP_URL || 'http://localhost:3333';
            pictureUrl = `${appUrl}/uploads/${picture_url}`;
        }

        const book = await prismaClient.book.update({
            where: { id },
            data: {
                title,
                author,
                description,
                publication_date,
                ...(pictureUrl && { picture_url: pictureUrl }),
            }
        });

        return book;
    }
}

export { UpdateBookService }