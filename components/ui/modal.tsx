"use client"
import React from "react";
import useFormData from "../hook/useFormData";

export default function Modal({children}:{children:React.ReactNode}) {
  const { open, handleSetOpen } = useFormData();

  return (
    <div className={`fixed top-0 left-0 z-5 bg-black/5 backdrop-blur-xs w-dvw h-dvh ${open ? 'flex' : 'hidden'} items-center`}
      onClick={handleSetOpen}>
      <div className="fixed z-10 left-1/2 -translate-x-1/2 shadow-sm size-3/8 rounded-2xl bg-white self-center p-8"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}