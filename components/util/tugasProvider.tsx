"use client"
import { taskType } from "@/app/page";
import { createContext, useEffect, useState } from "react";
import { kunciStorage } from "../ui/form";

interface TugasContext {
  tugas: taskType[];
  handleAddTugas: (newTugas: taskType) => void;
  handleEditCatTugas: (tugasId: number, newCat: string) => void;
  handleDelTugas: (targetId: number) => void;
}

export const TugasContext = createContext<TugasContext | null>(null);

export default function TugasProvider({ children }: { children: React.ReactNode }) {
  const [tugas, setTugas] = useState<taskType[]>([]);
  const [ismounted, setIsMounted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const savedData = localStorage.getItem(kunciStorage);
      setTugas(JSON.parse(savedData ? savedData : "[]"));
      setIsMounted(true);
    };
    loadData();
  }, [])

  useEffect(() => {
    if (ismounted) localStorage.setItem(kunciStorage, JSON.stringify(tugas));
  }, [tugas, ismounted])

  const handleAddTugas = (newTugas: taskType) => {
    setTugas((prev) => [...prev, newTugas]);
  }

  const handleEditCatTugas = (tugasId: number, newCat: string) => {
    setTugas((prev) =>
      prev.map((item) =>
        // objek bukan array, jadi pake {} bukan []
        item.id === tugasId ? { ...item, status: newCat } : item
      )
    )
  }

  const handleEditTugas = (tugasId: number, newTugas: string) => {
    setTugas((prev) =>
      prev.map((item) =>
        // objek bukan array, jadi pake {} bukan []
        item.id === tugasId ? { ...item, tugas: newTugas } : item
      )
    )
  }

  const handleDelTugas = (targetId: number) => {
    setTugas((prev) =>
      prev.filter(item => item.id !== targetId)
    )
  }

  return (
    <TugasContext value={{ tugas, handleAddTugas, handleEditCatTugas, handleDelTugas }}>
      {children}
    </TugasContext>
  )
}
