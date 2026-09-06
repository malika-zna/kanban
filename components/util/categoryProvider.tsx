"use client"
import { createContext, useState } from "react";

interface CategoryContextProps {
  selectedCategory: string;
  handleSetSelectedCategory: (cat: string) => void;
}

export const CategoryContext = createContext<CategoryContextProps | null>(null);

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSetSelectedCategory = (cat: string) => {
    setSelectedCategory(cat)
  }

  return <CategoryContext value={{ selectedCategory, handleSetSelectedCategory }}>
    {children}
  </CategoryContext>
}