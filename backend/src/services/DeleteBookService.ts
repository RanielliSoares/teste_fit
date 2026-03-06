import prismaClient from "../prisma";

interface DeleteBookServiceProps {
    id: string;
}

class DeleteBookService {
    async execute({ id }: DeleteBookServiceProps) {

        const bookAlreadyExists = await prismaClient.book.findUnique({
            where: { id }
        });
        if (!bookAlreadyExists) {
            throw new Error("Livro não encontrado");
        }
        const deletedBook = await prismaClient.book.delete({
            where: { id },
            select: {
                title: true,
            }
        });
        return { message: `Livro ${deletedBook.title} foi deletado com sucesso` };

    }
}

export { DeleteBookService };