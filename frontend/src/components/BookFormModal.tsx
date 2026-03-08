"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import selectImage from "@/assets/selectImage.png";
import api from "@/services/api";

interface Book {
  id?: string;
  title: string;
  author: string;
  publication_date: string;
  description: string;
  picture_url?: string;
}

interface BookFormModalProps {
  title: string;
  book?: Book | null;
  onCancel: () => void;
  onSave: (data: {
    title: string;
    author: string;
    publication_date: string;
    description: string;
    picture: File | null;
  }) => void;
}

export default function BookFormModal({ title, book, onCancel, onSave }: BookFormModalProps) {
  const router = useRouter();


  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);


  useEffect(() => {
    if (book) {
      setBookTitle(book.title);
      setAuthor(book.author);
      setPublicationDate(book.publication_date);
      setDescription(book.description);
      if (book.picture_url) {
        setPreview(book.picture_url);
      }
    }
  }, [book]);


  const isFormValid =
    bookTitle.trim() &&
    author.trim() &&
    publicationDate.trim() &&
    description.trim() &&
    (picture || preview);


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setPicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleRemoveImage() {
    setPicture(null);
    setPreview(null);
  }


  async function handleCreateBook() {
    const formData = new FormData();
    formData.append("title", bookTitle);
    formData.append("author", author);
    formData.append("publication_date", publicationDate);
    formData.append("description", description);

    if (picture) {
      formData.append("file", picture);
    }

    try {
      await api.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSave({ title: bookTitle, author, publication_date: publicationDate, description, picture });
      onCancel();
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar livro:", error);
    }
  }



  async function handleUpdateBook() {
    if (!book || !book.id) return;

    try {
      if (picture) {

        const formData = new FormData();
        formData.append("id", book.id.toString());
        formData.append("title", bookTitle);
        formData.append("author", author);
        formData.append("publication_date", publicationDate);
        formData.append("description", description);
        formData.append("file", picture);

        await api.put("/book", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {

        await api.put("/book", {
          id: book.id,
          title: bookTitle,
          author,
          publication_date: publicationDate,
          description,
        });
      }


      onSave({
        title: bookTitle,
        author,
        publication_date: publicationDate,
        description,
        picture,
      });


      onCancel();

    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[800px]">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

        <div className="flex gap-6">
       
          <div className="flex-1 flex flex-col gap-4">
            <input type="text" placeholder="Título" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className="border rounded-lg px-4 py-2" />
            <input type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} className="border rounded-lg px-4 py-2" />
            <input type="date" value={publicationDate ? new Date(publicationDate).toISOString().split("T")[0] : ""}
     onChange={(e) => setPublicationDate(e.target.value)} className="border rounded-lg px-4 py-2" />
            <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-lg px-4 py-2 h-32 resize-none" />
          </div>

         
          <div className="w-64 flex flex-col items-center justify-center border rounded-lg p-4">
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-48 object-contain rounded-lg mb-4" />
                <div className="flex flex-col items-center gap-2">
                  <label htmlFor="picture" className="cursor-pointer text-blue-600 font-semibold hover:underline">Trocar imagem</label>
                  <button onClick={handleRemoveImage} className="text-sm text-red-600 hover:underline">Remover imagem</button>
                </div>
                <input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </>
            ) : (
              <>
                <img src={selectImage.src} alt="Imagem padrão" width={61} height={61} className="object-contain rounded-lg mb-4" />
                <label htmlFor="picture" className="cursor-pointer text-[#444444] font-semibold hover:underline">Escolher imagem</label>
                <input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-center gap-6 mt-8">
          <button onClick={onCancel} className="px-6 py-2 rounded-full bg-gray-200 min-w-[228px] hover:bg-gray-300">Cancelar</button>
          <button
            onClick={book && book.id ? handleUpdateBook : handleCreateBook}
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-full min-w-[228px] min-h-[59px] ${isFormValid ? "bg-[#0093E6] text-white hover:bg-[#007ACC]" : "bg-[#0093E6] text-white opacity-50 cursor-not-allowed"
              }`}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}