"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";

import api from "@/services/api";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publication_date: string;
  picture_url: string;
}

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.post<Book>("/book/show", { id: id });
        setBook(response.data);
      } catch (error) {
        console.error("Erro ao buscar livro:", error);
      }
    }

    if (id) {
      fetchBook();
    }
  }, [id]);

  async function handleDelete() {
    try {
      await api.delete("/book", { data: { id } });
      router.push("/");
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  }


  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-8 py-8">
        <p className="p-8">Erro ao carregar dados do livro..</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-1 text-[24px] font-semibold text-foreground hover:opacity-70 transition-opacity cursor-pointer"
          onClick={() => router.push("/")}>
          <ChevronLeftIcon className="w-5 h-5" />
          Voltar
        </button>
        <div className="flex items-center gap-4">
          <button className="text-[24px] font-semibold text-foreground hover:opacity-70 transition-opacity">
            Editar
          </button>
          <button className="text-[24px] font-semibold text-red-600 hover:opacity-70 transition-opacity"
            onClick={() => setShowModal(true)}>
            Excluir
          </button>
        </div>
      </div>

      <div className="flex items-start gap-10">
        {/* Coluna esquerda */}
        <div className="flex-1">
          <h1 className="text-[40px] font-bold text-foreground mb-6 leading-tight">
            {book.title}
          </h1>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[20px] font-semibold text-foreground">Por {book.author}</p>
            <p className="text-[20px] font-semibold text-foreground">
              Publicado em {new Date(book.publication_date).toLocaleDateString("pt-BR")}
            </p>
          </div>
          <p className="text-[16px] text-foreground text-justify leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Imagem */}
        <img
          src={book.picture_url}
          alt={book.title}
          className="w-72 object-contain shrink-0"
        />
      </div>
      {/* Modal de confirmação */}
      {showModal && (
        <ConfirmModal
          title="Tem certeza?"
          message="Ao excluir este livro não será possível recuperá-lo. Realmente deseja excluí-lo?"
          confirmText="Excluir"
          cancelText="Cancelar"
          confirmColor="bg-[#A70000] hover:bg-red-700 text-white"
          cancelColor="bg-[#D5D5D5] hover:bg-gray-300 text-black"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

    </div>
  );
}