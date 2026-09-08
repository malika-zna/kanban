"use client"
import { useContext } from "react";
import useFormData from "../hook/useFormData";
import { CategoryContext } from "../util/categoryProvider";

export default function AddButton({ category }: { category: string }) {
  const { handleSetOpen } = useFormData();
  const catContext = useContext(CategoryContext);
  if (!catContext) {
    throw new Error("bukan di dalam CategoryProvider");
  }
  const handleSetCat = catContext.handleSetSelectedCategory;

  return (
    <>
      <button
        className="font-bold bg-black/5 hover:bg-black hover:text-white duration-300 cursor-pointer p-1 rounded-full"
        onClick={() => { handleSetOpen(); handleSetCat(category) }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>
    </>
  );
}