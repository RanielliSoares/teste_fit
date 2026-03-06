import prismaClient from "../prisma";

class ListBookService {
    async execute() {
        const books = await prismaClient.book.findMany({
            select:{
                id: true,
                title: true,
                author: true,
                publication_date: true,
                description: true,
                picture_url: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return books;
    }
}

export { ListBookService };