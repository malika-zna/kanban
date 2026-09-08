"use client"
import React, { useContext } from 'react'
import CancelButton from './cancelButton'
import SaveButton from './saveButton'
import { TugasContext } from '../util/tugasProvider'
import useFormData from '../hook/useFormData'

export default function FormEdit() {
  const tugasContext = useContext(TugasContext);
  if (!tugasContext) throw new Error("bukan di dalam TugasProvider");
  const editTugas = (id: number, tugas: string) => tugasContext.handleEditTugas(id, tugas);

  const modalContext = useFormData();
  const teksAwal = modalContext.typed;
  const setTyped = (teks: string) => modalContext.handleSetTyped(teks);

  function editTask(e: React.SubmitEvent) {
    e.preventDefault();
    const tugas = modalContext.typed;
    const id = modalContext.idTyped;
    editTugas(id, tugas);
    e.target.reset();
    modalContext.handleSetOpen();
  }

  return (
    <form onSubmit={editTask}
      className='size-full flex flex-col justify-between '>
      <h1 className="text-2xl font-bold">Edit Item</h1>
      <input name="tugas" type="text" required placeholder="nama tugas" className="border-2" value={teksAwal} onChange={(e) => setTyped(e.target.value)} />
      <div className="flex gap-2">
        <CancelButton></CancelButton>
        <SaveButton></SaveButton>
      </div>
    </form>
  )
}