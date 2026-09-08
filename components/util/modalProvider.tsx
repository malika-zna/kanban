"use client"
import React, { createContext, useState } from "react";

interface FormContextProps {
  open: boolean;
  edit: boolean;
  handleSetOpen: VoidFunction;
  handleSetEdit: (id: number, teks: string) => void;
  idTyped: number;
  typed: string;
  handleSetTyped: (teks: string) => void;
}

export const FormContext = createContext<FormContextProps | null>(null);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [idTyped, setIdTyped] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");

  const handleSetOpen = () => {
    setOpen((prev) => prev === true ? false : true);
    setEdit(false);
  }

  const handleSetEdit = (id: number, teks: string) => {
    setIdTyped(id);
    setTyped(teks);
    setOpen((prev) => prev === true ? false : true);
    setEdit(true);
  }

  const handleSetTyped = (teks: string) => {
    setTyped(teks);
  }

  return (
    <FormContext value={{ open, edit, idTyped, handleSetOpen, handleSetEdit, typed, handleSetTyped }}>
      {children}
    </FormContext>
  )
}