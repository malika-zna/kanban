"use client"

import AddButton from "@/components/ui/addButton";
import CategoryProvider from "@/components/util/categoryProvider";
import ModalProvider from "@/components/util/modalProvider";
import { useState } from "react";

enum statusEnum {
  start = 1,
  progress = 2,
  finish = 3
}

interface taskType {
  id: number;
  tugas: string;
  status: statusEnum
}

const item = [
  {
    "id": 1788682959088,
    "tugas": "bbb",
    "status": statusEnum.progress
  },
  {
    "id": 1788682968216,
    "tugas": "kkkk",
    "status": statusEnum.progress
  },
  {
    "id": 1788683068210,
    "tugas": "aa",
    "status": statusEnum.start
  }
]

export default function Home() {
  return (
    <>
      <ModalProvider>
        <CategoryProvider>
          <div className="h-dvh flex flex-row gap-2 p-2">
            <Category catId={1} color="bg-blue-400"></Category>
            <Category catId={2} color="bg-amber-500"></Category>
            <Category catId={3} color="bg-emerald-700"></Category>
          </div>
        </CategoryProvider>
      </ModalProvider>
    </>
  )
}

// APA YANG SALAH? ada 3 kategori yang masing2 punya state terpisah. update 1 state tidak akan mengupdate yang lain

function Category({ catId, color }: { catId: number, color: string }) {
  const [tugas, setTugas] = useState<taskType[]>(item);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dragged = document.querySelector(".dragging");
    const draggedId = Number(dragged?.getAttribute("id"));
    const newId = Number(e.currentTarget.getAttribute("id"));
    console.log(dragged)
    if (dragged && newId && draggedId) {
      // e.currentTarget.appendChild(dragged);
      setTugas((prevItems) =>
        prevItems.map((task) =>
          task.id === draggedId ? { ...task, status: newId } : task
        )
      )
    };
    e.currentTarget.classList.remove("!bg-black")
  }

  return (
    <>
      <div id={String(catId)} className="bg-black/2 border border-gray-200 w-full p-5 rounded-lg flex flex-col gap-5"
        onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className={`size-2 rounded-full ${color}`}></div>
          <h1>{statusEnum[catId]}</h1>
          <div className="flex-1"></div>
          <AddButton category={statusEnum[catId]}></AddButton>
        </div>
        {
          tugas.map((task) => {
            return (
              task.status === catId && <Card key={task.id} id={task.id} tugas={task.tugas} status={task.status}></Card>
            )
          })
        }
      </div>
    </>
  )
}

function Card({ id, tugas, status }: taskType) {
  return (
    <div id={String(id)} className="bg-white cursor-grab border border-gray-300 rounded-lg p-5"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}>
      <div className="mb-4">{tugas}</div>
      <div className="flex justify-between opacity-50">
        <p className="text-xs">#{id}</p>
        <p className="text-xs w-fit">{statusEnum[status]}</p>
      </div>
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