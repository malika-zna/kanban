"use client"

import useFormData from "@/components/hook/useFormData";
import AddButton from "@/components/ui/addButton";
import FormEdit from "@/components/ui/edit_form";
import Form from "@/components/ui/form";
import Modal from "@/components/ui/modal";
import CategoryProvider from "@/components/util/categoryProvider";
import { TugasContext } from "@/components/util/tugasProvider";
import { useContext, useEffect, useState } from "react";

enum statusEnum {
  start = 1,
  progress = 2,
  finish = 3
}

enum catColorEnum {
  start = "bg-blue-400",
  progress = "bg-amber-500",
  finish = "bg-emerald-700"
}

enum borderColorEnum {
  start = "border-l-blue-400",
  progress = "border-l-amber-500",
  finish = "border-l-emerald-700 opacity-60"
}

export interface taskType {
  id: number;
  tugas: string;
  status: string
}

export default function Home() {
  const modalContext = useFormData();

  const tugasContext = useContext(TugasContext);
  if (!tugasContext) {
    throw new Error("bukan di dalam TugasProvider");
  }
  const tugas = tugasContext.tugas;
  const editTugas = (tugasId: number, newCat: string) => { tugasContext.handleEditCatTugas(tugasId, newCat) }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dragged = document.querySelector(".dragging");
    const draggedId = Number(dragged?.getAttribute("id"));
    const newId = Number(e.currentTarget.getAttribute("id"));
    console.log(dragged)
    if (dragged && newId && draggedId) {
      editTugas(draggedId, statusEnum[newId]);
    };
    e.currentTarget.classList.remove("!bg-black/5")
  }

  return (
    <>
      <CategoryProvider>
        <Modal>
          {modalContext.edit ?
            <FormEdit></FormEdit>
            :
            <Form></Form>
          }
        </Modal>
        <div className="h-dvh flex flex-row gap-2 p-2">
          <Category catId={statusEnum.start} color={catColorEnum.start} tugas={tugas} handleDrop={handleDrop}></Category>
          <Category catId={statusEnum.progress} color={catColorEnum.progress} tugas={tugas} handleDrop={handleDrop}></Category>
          <Category catId={statusEnum.finish} color={catColorEnum.finish} tugas={tugas} handleDrop={handleDrop}></Category>
        </div>
      </CategoryProvider>
    </>
  )
}

function Category({ catId, color, tugas, handleDrop }: { catId: number, color: string, tugas: taskType[], handleDrop: (e: React.DragEvent) => void }) {
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
          tugas ? tugas.map((task) => {
            return (
              String(task.status) === String(statusEnum[catId]) && <Card key={task.id} id={task.id} tugas={task.tugas} status={task.status}></Card>
            )
          }) : <div>-</div>
        }
      </div>
    </>
  )
}

function Card({ id, tugas, status }: taskType) {
  const tugasContext = useContext(TugasContext);
  if (!tugasContext) throw new Error("Bukan di dalam TugasProvider");
  const delTugas = (targetId: number) => tugasContext.handleDelTugas(targetId);

  const modalContext = useFormData();
  const openModalEdit = (id: number, tugas: string) => {
    modalContext.handleSetEdit(id, tugas);
  }

  return (
    <div id={String(id)} className={`relative bg-white cursor-grab border border-gray-300 ${borderColorEnum[status as keyof typeof catColorEnum]} border-l-4 rounded-lg p-5`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}>
      <div className="absolute right-4 top-4 **:text-sm flex gap-2">
        <div className="cursor-pointer"
          onClick={() => openModalEdit(id, tugas)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-black/40 hover:text-black bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </div>
        <div className="cursor-pointer"
          onClick={() => delTugas(id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-black/40 hover:text-red-600 bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </div>
      </div>
      <div className="mb-4">{tugas}</div>
      <div className="flex justify-between opacity-50">
        <p className="text-xs">#{id}</p>
        <p className="text-xs w-fit">{status}</p>
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
  e.currentTarget.classList.add("!bg-black/5")
}

function handleDragLeave(e: React.DragEvent) {
  e.currentTarget.classList.remove("!bg-black/5")
}

function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}