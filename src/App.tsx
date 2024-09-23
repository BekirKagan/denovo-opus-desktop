import TaskContainer from "./components/TaskContainer"
import { Task, Priority, Status } from "./types/task"
import { useState } from "react"
import { invoke } from "@tauri-apps/api/core"

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  function addTask() {
    const newTask: Task = {
      title: "Default Title",
      content: "Default content.",
      priority: Priority.Negligible,
      status: Status.Todo
    }
    setTasks([...tasks, newTask])
    invoke("save_tasks", { tasks: tasks })
  }

  function removeTask(taskToRemove: Task) {
    const taskIndex: number = tasks.indexOf(taskToRemove)
    setTasks(tasks => tasks.filter((_, index) => taskIndex !== index))
  }

  function editTask(taskToEdit: Task, updatedTask: Task) {
    const taskIndex: number = tasks.indexOf(taskToEdit)
    setTasks(tasks => tasks.map((task, index) => taskIndex === index ? updatedTask : task))
  }

  function updateTaskStatus(taskToUpdate: Task, updatedTask: Task) {
    const taskIndex: number = tasks.indexOf(taskToUpdate)
    setTasks(tasks => tasks.map((task, index) => taskIndex === index ? updatedTask : task))
  }

  return (
    <div className={"w-screen h-screen bg-background text-foreground flex flex-col border border-primary-500"}>
      <div className="w-full h-10 flex items-center border-b border-primary-500">
        <h1 className="absolute left-2 text-xl font-bold">DenovoOpus</h1>
        <button className="absolute right-2 w-20 h-6 bg-primary-600 font-semibold hover:bg-primary-700" onClick={addTask}>Add task</button>
      </div>
      <div className="w-full h-full flex overflow-y-scroll no-scrollbar">
        <div className="flex-1 flex flex-col p-2 text-center items-center">
          <h1 className="font-bold w-full pb-5">To Do</h1>
          <div className="w-full flex flex-col my-1 space-y-2 items-center overflow-y-scroll no-scrollbar">
            {tasks.filter(task => task.status == Status.Todo).map((task, index) => {
              return <TaskContainer key={index} task={task} onRemoveTask={removeTask} onEditTask={editTask} onUpdateTaskStatus={updateTaskStatus} />
            })}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-2 text-center border-x border-primary-500">
          <h1 className="font-bold w-full pb-5">Doing</h1>
          <div className="w-full flex flex-col my-1 space-y-2 items-center overflow-y-scroll no-scrollbar">
            {tasks.filter(task => task.status == Status.Doing).map((task, index) => {
              return <TaskContainer key={index} task={task} onRemoveTask={removeTask} onEditTask={editTask} onUpdateTaskStatus={updateTaskStatus} />
            })}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-2 text-center">
          <h1 className="font-bold w-full pb-5">Done</h1>
          <div className="w-full flex flex-col my-1 space-y-2 items-center overflow-y-scroll no-scrollbar">
            {tasks.filter(task => task.status == Status.Done).map((task, index) => {
              return <TaskContainer key={index} task={task} onRemoveTask={removeTask} onEditTask={editTask} onUpdateTaskStatus={updateTaskStatus} />
            })}
          </div>
        </div>
      </div>
    </div >
  )
}
