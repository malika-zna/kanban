"use client"
import React, { createContext, useState } from "react";

interface FormContextProps {
  open: boolean;
  handleSetOpen: VoidFunction;
}

export const FormContext = createContext<FormContextProps | null>(null);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleSetOpen = () => {
    setOpen((prev) => prev === true ? false : true);
  }

  return (
    <FormContext value={{open, handleSetOpen}}>
      {children}
    </FormContext>
  )
}