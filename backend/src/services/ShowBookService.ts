import prismaClient from "../prisma";

interface ShowBookServiceProps {
    id: string;
}

class ShowBookService {
    async execute({ id }: ShowBookServiceProps) {

        const book = await prismaClient.book.findUnique({
            where: {
                id: id
            }, select: {
                id: true,
                title: true,
                author: true,
                description: true,
                publication_date: true,
                picture_url: true,
            }
        });

        if (!book) {
            
            throw new Error("Livro não encontrado");
        }

        return book;
    }
}
export { ShowBookService };