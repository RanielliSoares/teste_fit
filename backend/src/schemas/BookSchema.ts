import { z } from 'zod';

export const createBookSchema = z.object({
    body: z.object({
        title: z
            .string({ message: "O título precisa ser um texto" })
            .min(3, { message: "O título precisa ter no mínimo 3 letras" }),
        author: z
            .string({ message: "O autor precisa ser um texto" })
            .min(3, { message: "O autor precisa ter no mínimo 3 letras" }),
        publication_date: z
            .string({ message: "A data de publicação é obrigatória" }),
        description: z
            .string({ message: "A descrição é obrigatória" })
            .min(10, { message: "A descrição deve ter no mínimo 10 caracteres" }),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});

export const updateBookSchema = z.object({
    body: z.object({
        id: z
            .string({ message: "O id é obrigatório" }),
        title: z
            .string({ message: "O título precisa ser um texto" })
            .min(3, { message: "O título precisa ter no mínimo 3 letras" }),
        author: z
            .string({ message: "O autor precisa ser um texto" })
            .min(3, { message: "O autor precisa ter no mínimo 3 letras" }),
        publication_date: z
            .string({ message: "A data de publicação é obrigatória" }),
        description: z
            .string({ message: "A descrição é obrigatória" })
            .min(10, { message: "A descrição deve ter no mínimo 10 caracteres" }),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});

export const listBooksSchema = z.object({
    body: z.object({}).optional(),
    query: z.object({}).optional(),
    params: z.object({
        id: z.string({ message: "O ID precisa ser um texto" }),
    }).optional(),
});

export const deleteBooksSchema = z.object({
    body: z.object({
        id: z
            .string({ message: "O ID precisa ser um texto" }).min(1, { message: "O ID é obrigatório" }),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});