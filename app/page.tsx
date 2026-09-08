"use client"

import useFormData from "@/components/hook/useFormData";
import AddButton from "@/components/ui/addButton";
import FormEdit from "@/components/ui/edit_form";
import Form from "@/components/ui/form";
import Modal from "@/components/ui/modal";
import CategoryProvider from "@/components/util/categoryProvider";
import { TugasContext } from "@/components/util/tugasProvider";
import { useContext } from "react";

enum statusEnum {
  start = 1,
  progress = 2,
  finish = 3
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
          <Category catId={statusEnum.start} color="bg-blue-400" tugas={tugas} handleDrop={handleDrop}></Category>
          <Category catId={statusEnum.progress} color="bg-amber-500" tugas={tugas} handleDrop={handleDrop}></Category>
          <Category catId={statusEnum.finish} color="bg-emerald-700" tugas={tugas} handleDrop={handleDrop}></Category>
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
    <div id={String(id)} className="relative bg-white cursor-grab border border-gray-300 rounded-lg p-5"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}>
      <div className="absolute right-3 top-2 **:text-sm flex gap-2">
        <div className="px-1.5 rounded-full hover:bg-black/5 cursor-pointer"
          onClick={() => openModalEdit(id, tugas)}>e</div>
        <div className="px-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
          onClick={() => delTugas(id)}>x</div>
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