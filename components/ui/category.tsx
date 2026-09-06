"use client"
import React, { useState } from "react";
import AddButton from "./addButton";
import Card from "./card";

export enum statusEnum {
  start = 1,
  progress = 2,
  finish = 3
}

interface CategoryProps {
  name: string
  color: string
  // children: React.ReactNode
}

interface HeaderCategoryProps {
  name: string
  color: string
}

export interface objekTugas {
  id: number,
  tugas: string,
  status: statusEnum
}

interface CardProps {
  title: string
  status: statusEnum
}

const item = [
  {
    "id": 1788682959088,
    "tugas": "bbb",
    "status": statusEnum.progress
  },
  {
    "id": 1788682968216,
    "tugas": "kkkk",
    "status": statusEnum.progress
  },
  {
    "id": 1788683068210,
    "tugas": "aa",
    "status": statusEnum.start
  }
]

export function Category({ name, color }: CategoryProps) {
  const [tugas, setTugas] = useState<objekTugas[]>(item);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dragged = document.querySelector(".dragging");
    const draggedId = Number(dragged?.getAttribute("id"));
    const newId = Number(e.currentTarget.getAttribute("name"));
    console.log(dragged)
    if (dragged && newId && draggedId) {
      // e.currentTarget.appendChild(dragged);
      setTugas((prevItems) =>
        prevItems.map((task) =>
          task.id === draggedId ? { ...task, status: newId } : task
        )
      )
    };
    e.currentTarget.classList.remove("!bg-black")
  }

  return (
    <div className="bg-black/2 border border-gray-200 w-full p-5 rounded-lg flex flex-col gap-5"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <HeaderCategory name={statusEnum[Number(name)]} color={color}></HeaderCategory>
      {
        tugas.map((tugas) => {
          return (
            tugas.status === Number(name) && <Card key={tugas.id} id={tugas.id} tugas={tugas.tugas} status={tugas.status}></Card>
          )
        })
      }
    </div>
  );
}

function HeaderCategory({ name, color }: HeaderCategoryProps) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className={`size-2 rounded-full ${color}`}></div>
      <h1>{name}</h1>
      <div className="flex-1"></div>
      <AddButton category={name}></AddButton>
    </div>
  );
}

function handleDragEnter(e: React.DragEvent) {
  e.currentTarget.classList.add("!bg-black/5")
}

function handleDragLeave(e: React.DragEvent) {
  e.currentTarget.classList.remove("!bg-black/5")
}

export function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}