"use client"
import React, { useContext, useState } from 'react'
import CancelButton from './cancelButton'
import SaveButton from './saveButton'
import { CategoryContext } from '../util/categoryProvider'
import { taskType } from '@/app/page'
import { TugasContext } from '../util/tugasProvider'
import useFormData from '../hook/useFormData'

export const kunciStorage = 'todoTersimpan';

export function adakahStorage() {
  if (typeof (Storage) === undefined) {
    alert('Browser tidak mendukung lokal storage');
    return false;
  }
  return true;
}

export default function Form() {
  const [typed, setTyped] = useState<string>("");

  const catContext = useContext(CategoryContext);
  if (!catContext) throw new Error("bukan di dalam CategoryProvider");
  const selectedCategory = catContext.selectedCategory;

  const tugasContext = useContext(TugasContext);
  if (!tugasContext) throw new Error("bukan di dalam TugasProvider");
  const setTugas = (tugas: taskType) => tugasContext.handleAddTugas(tugas);

  const modalContext = useFormData();

  function addTask(e: React.SubmitEvent) {
    e.preventDefault();
    if (adakahStorage()) {
      const id = buatId();
      const tugas = typed;
      const status = selectedCategory;
      const objekTugas = buatObjekTugas(id, tugas, status);
      setTugas(objekTugas);
      e.target.reset();
      modalContext.handleSetOpen();
    }
  }

  function buatId() {
    return +new Date();
  }

  function buatObjekTugas(id: number, tugas: string, status: string) {
    return {
      id,
      tugas,
      status
    }
  }

  return (
    <form onSubmit={addTask}
      className='size-full flex flex-col justify-between '>
      <h1 className="text-2xl font-bold">Tambahkan Item</h1>
      <input name="tugas" type="text" required placeholder="nama tugas" onChange={(e) => setTyped(e.target.value)} />
      <div className="flex gap-2">
        <CancelButton></CancelButton>
        <SaveButton></SaveButton>
      </div>
    </form>
  )
}