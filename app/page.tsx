"use client"

import useFormData from "@/components/hook/useFormData";
import Category from "@/components/ui/category";
import FormEdit from "@/components/ui/edit_form";
import Form from "@/components/ui/form";
import Modal from "@/components/ui/modal";
import CategoryProvider from "@/components/util/categoryProvider";
import { TugasContext } from "@/components/util/tugasProvider";
import { useContext } from "react";

export enum statusEnum {
  start = 1,
  progress = 2,
  finish = 3
}

export enum catColorEnum {
  start = "bg-blue-500",
  progress = "bg-amber-500",
  finish = "bg-emerald-700"
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
        <div className="min-h-dvh flex flex-row gap-2 p-2">
          <Category catId={statusEnum.start} color={catColorEnum.start} tugas={tugas} handleDrop={handleDrop}></Category>
          <Category catId={statusEnum.progress} color={catColorEnum.progress} tugas={tugas} handleDrop={handleDrop}></Category>
          <Category catId={statusEnum.finish} color={catColorEnum.finish} tugas={tugas} handleDrop={handleDrop}></Category>
        </div>
      </CategoryProvider>
    </>
  )
}

