import { statusEnum, taskType } from "@/app/page"
import AddButton from "./addButton"
import Card from "./card"

export default function Category({ catId, color, tugas, handleDrop }: { catId: number, color: string, tugas: taskType[], handleDrop: (e: React.DragEvent) => void }) {
  return (
    <div id={String(catId)} className="bg-black/2 border border-gray-200 w-full p-5 rounded-lg flex flex-col gap-5"
      onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
    >
      <div className="flex items-center gap-2 mb-8">
        <div className={`size-2 rounded-full ${color}`}></div>
        <h1 className="capitalize">{statusEnum[catId]}</h1>
        <div className="flex-1"></div>
        <AddButton category={statusEnum[catId]}></AddButton>
      </div>
      {
        tugas ? tugas.map((task) => {
          return (
            String(task.status) === String(statusEnum[catId]) && <Card key={task.id} id={task.id} tugas={task.tugas} status={task.status}></Card>
          )
        }) : <div>-</div>
      }
    </div>
  )
}

function handleDragEnter(e: React.DragEvent) {
  e.currentTarget.classList.add("!bg-black/5")
}

function handleDragLeave(e: React.DragEvent) {
  e.currentTarget.classList.remove("!bg-black/5")
}

function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
}