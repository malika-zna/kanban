"use client"

import { useState } from "react";

enum categoryEnum {
  Novel = 1,
  PengembanganDiri = 2,
  Sejarah = 3
}

interface dataBukuType {
  id: number;
  judul: string;
  kategori: categoryEnum
}

const dataBuku = [
  { id: 1, judul: "Negeri 5 Menara", kategori: categoryEnum.Novel },
  // { id: 2, judul: "Laskar Pelangi", kategori: categoryEnum.Novel },
  { id: 3, judul: "Bumi Manusia", kategori: categoryEnum.Novel },
  { id: 4, judul: "Rindu", kategori: categoryEnum.Novel },
  { id: 5, judul: "Filosofi Teras", kategori: categoryEnum.PengembanganDiri },
  // { id: 6, judul: "Atomic Habits", kategori: categoryEnum.PengembanganDiri },
  { id: 7, judul: "Sebuah Seni untuk Bersikap Bodo Amat", kategori: categoryEnum.PengembanganDiri },
  { id: 8, judul: "Bicara Itu Ada Seninya", kategori: categoryEnum.PengembanganDiri },
  { id: 9, judul: "Sapiens: Riwayat Singkat Umat Manusia", kategori: categoryEnum.Sejarah },
  { id: 10, judul: "Gajah Mada: Bergelut dalam Kemelut Tahta dan Angkara", kategori: categoryEnum.Sejarah },
  // { id: 11, judul: "Sejarah Dunia yang Disembunyikan", kategori: categoryEnum.Sejarah },
  { id: 12, judul: "Catatan Seorang Demonstran", kategori: categoryEnum.Sejarah }
];

export default function Home() {
  const [books, setBooks] = useState<dataBukuType[]>(dataBuku);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dragged = document.querySelector(".dragging");
    const draggedId = Number(dragged?.getAttribute("id"));
    const newId = Number(e.currentTarget.getAttribute("id"));
    console.log(dragged)
    if (dragged && newId && draggedId) {
      // e.currentTarget.appendChild(dragged);
      setBooks((prevItems) =>
        prevItems.map( (buku) => 
          buku.id === draggedId ? {...buku, kategori: newId} : buku
        )
      )
    };
    e.currentTarget.classList.remove("!bg-black")
  }

  return (
    <>
      <div className="flex h-dvh gap-5 *:bg-amber-200 *:w-full *:p-5 **:flex **:flex-col *:gap-5">
        <div id="1" className="" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            books.map((buku) => {
              return (
                buku.kategori === 1 && <Card key={buku.id} id={buku.id} judul={buku.judul} kategori={buku.kategori}></Card>
              )
            })
          }
        </div>
        <div id="2" className="" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            books.map((buku) => {
              return (
                buku.kategori === 2 && <Card key={buku.id} id={buku.id} judul={buku.judul} kategori={buku.kategori}></Card>
              )
            })
          }
        </div>
        <div id="3" className="" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
          {
            books.map((buku) => {
              return (
                buku.kategori === 3 && <Card key={buku.id} id={buku.id} judul={buku.judul} kategori={buku.kategori}></Card>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

function Card({ id, judul, kategori }: dataBukuType) {
  return (
    <div id={String(id)} data-cat-id={categoryEnum[kategori]} className="border bg-amber-400 p-5" draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}>
      <h1>{judul}</h1>
      <p>{kategori}</p>
    </div>
  )
}

function handleDragStart(e: React.DragEvent) {
  e.currentTarget.classList.add("dragging");
}

function handleDragEnd(e: React.DragEvent) {
  e.currentTarget.classList.remove("dragging");
}

function handleDragEnter(e: React.DragEvent) {
  e.currentTarget.classList.add("!bg-black")
}

function handleDragLeave(e: React.DragEvent) {
  e.currentTarget.classList.remove("!bg-black")
}

function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}