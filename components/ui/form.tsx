"use client"
import useFormData from "../hook/useFormData";
import CancelButton from "./cancelButton";
import SaveButton from "./saveButton";

export default function Form() {
  const { open, handleSetOpen } = useFormData();

  return (
    <div className={`fixed top-0 left-0 z-5 bg-black/5 backdrop-blur-xs w-dvw h-dvh ${open ? 'flex' : 'hidden'} items-center`}
      onClick={handleSetOpen}>
      <div className="fixed z-10 left-1/2 -translate-x-1/2 shadow-sm flex flex-col justify-between size-3/8 rounded-2xl bg-white self-center p-8"
        onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl font-bold">Tambahkan Item</h1>
        <input type="text" placeholder="nama tugas" className="border-2" />
        <div className="flex gap-2">
          <CancelButton></CancelButton>
          <SaveButton></SaveButton>
        </div>
      </div>
    </div>
  );
}