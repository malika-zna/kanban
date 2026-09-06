"use client"
import React, { useContext } from 'react'
import CancelButton from './cancelButton'
import SaveButton from './saveButton'
import { CategoryContext } from '../util/categoryProvider'
import { objekTugas } from './category'

export default function Form2() {
  const catContext = useContext(CategoryContext);
  if (!catContext) {
    throw new Error("bukan di dalam CategoryProvider");
  }
  const selectedCategory = catContext.selectedCategory;

  return (
    <form action={addTask}
      className='size-full flex flex-col justify-between '>
      <h1 className="text-2xl font-bold">Tambahkan Item</h1>
      <input name="tugas" type="text" required placeholder="nama tugas" className="border-2" />
      <input name="category" type="text" required defaultValue={selectedCategory} className="hidden" />
      <div className="flex gap-2">
        <CancelButton></CancelButton>
        <SaveButton></SaveButton>
      </div>
    </form>
  )
}

const arrayTugas: objekTugas[] = [];
const tampilkanData = 'tampilkanTodo';
const tugasDisimpanDiStorage = 'saved-todo';
export const kunciStorage = 'todoTersimpan';

async function addTask(formData: FormData) {
  if (adakahStorage()) {
    const id = buatId();
    const tugas = formData.get("tugas") as string;
    const status = formData.get("category") as string;

    const objekTugas = buatObjekTugas(id, tugas, status);
    arrayTugas.push(objekTugas);

    const stringTodos = JSON.stringify(arrayTugas);
    localStorage.setItem(kunciStorage, stringTodos);
    document.dispatchEvent(new Event(tugasDisimpanDiStorage));
  }
}

export function adakahStorage() {
  if (typeof (Storage) === undefined) {
    alert('Browser tidak mendukung lokal storage');
    return false;
  }
  return true;
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
