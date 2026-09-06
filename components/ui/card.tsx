"use client"
import clsx from "clsx";
import React, { useState } from "react";
import { handleDragOver, objekTugas, statusEnum } from "./category";

export default function Card({ id, tugas, status }: objekTugas) {
  const [dragging, setDragging] = useState(false);

  return (
    <div id={String(id)} className={
      clsx("bg-white cursor-grab border border-gray-300 rounded-lg p-5",
        {
          "dragging": dragging === true
        }
      )
    } draggable={true}
      onDragStart={() => { setDragging(true); }}
      onDragEnd={() => { setDragging(false); }}
      onDragOver={handleDragOver}
    >
      <div className="mb-4">{tugas}</div>
      <div className="flex justify-between opacity-50">
        <p className="text-xs">#{id}</p>
        <p className="text-xs w-fit">{statusEnum[status]}</p>
      </div>
    </div>
  );
}