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
        className="font-bold bg-black/10 px-2 rounded-full"
        onClick={() => { handleSetOpen(); handleSetCat(category) }}
      >+</button>
    </>
  );
}