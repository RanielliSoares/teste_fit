"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    publication_date: string;
    picture_url: string;
}

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await api.get<Book[]>("/books");
                setBooks(response.data);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
            }
        }

        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-[#F0F0F0] px-8 py-8">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-[2.5rem] font-bold text-foreground">Livros</h1>
                <button className="text-2xl font-bold text-foreground hover:opacity-70 transition-opacity">
                    Novo
                </button>
            </div>


            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full bg-white rounded-xl px-4 py-3 pr-12 text-[#222222] placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-gray-300"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((books) => (
                    <div
                        key={books.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >

                        <div className="bg-[#E8E8E8] flex items-center justify-center h-48">
                            <img
                                src={books.picture_url}
                                alt={books.title}
                                className="h-full object-contain p-4"
                            />
                        </div>


                        <div className="p-4">
                            <h2 className="font-bold text-[#222222] text-base mb-2 leading-snug">
                                {books.title}
                            </h2>
                            <p className="text-sm text-[#222222] text-justify leading-relaxed line-clamp-5">
                                {books.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
