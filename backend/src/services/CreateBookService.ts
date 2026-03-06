import prismaClient from "../prisma";

interface CreateBoomProps{
    title: string;
    author: string;
    publication_date: Date;
    description: string;
    picture_url: string;
}

class CreateBookService {
    async execute({ title, author, publication_date, description, picture_url }: CreateBoomProps) {

        const appUrl = process.env.APP_URL || 'http://localhost:3333';
        const pictureUrl = `${appUrl}/uploads/${picture_url}`;

        const book = await prismaClient.book.create({
            data:{
                title: title,
                author: author,
                publication_date: new Date(publication_date),
                description: description,
                picture_url: pictureUrl
            }, select :{
                id: true,
                title: true,
                author: true,
                publication_date: true,
                description: true,
                picture_url: true,
                createdAt:true
            }
        })
        return book;

    }
}

export { CreateBookService };