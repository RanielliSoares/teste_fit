"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import BookFormModal from "@/components/BookFormModal";

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
  const [searchTerm, setSearchTerm] = useState(""); // novo estado
  const router = useRouter();
  const [showModalEdit, setShowModalEdit] = useState(false);

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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[2.5rem] font-bold text-foreground">Livros</h1>
        <button
          className="text-2xl font-bold text-foreground hover:opacity-70 transition-opacity"
          onClick={() => setShowModalEdit(true)}
        >
          Novo
        </button>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white rounded-xl px-4 py-3 pr-12 text-[#222222] placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-gray-300"
        />
        <MagnifyingGlassIcon
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => router.push(`/bookDetails/${book.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="bg-[#E8E8E8] flex items-center justify-center h-48">
              <img
                src={book.picture_url}
                alt={book.title}
                className="h-full object-contain p-4"
              />
            </div>

            <div className="p-4">
              <h2 className="font-bold text-[#222222] text-base mb-2 leading-snug">
                {book.title}
              </h2>
              <p className="text-sm text-[#222222] text-justify leading-relaxed line-clamp-5">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModalEdit && (
        <BookFormModal
          title="Criar Livro"
          onCancel={() => setShowModalEdit(false)}
          onSave={() => window.location.reload()}
        />
      )}
    </div>
  );
}