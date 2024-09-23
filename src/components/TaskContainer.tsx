import { Task, Priority, Status } from "../types/task"
import { FormEvent, useState } from "react"

export default function TaskContainer(props: {
  task: Task,
  onRemoveTask: (taskToRemove: Task) => void
  onEditTask: (taskToEdit: Task, updatedTask: Task) => void
  onUpdateTaskStatus: (taskToUpdate: Task, updatedTask: Task) => void
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const getPriorityColor = () => {
    switch (props.task.priority) {
      case Priority.Negligible:
        return "bg-priority-negligible"
      case Priority.Low:
        return "bg-priority-low"
      case Priority.Moderate:
        return "bg-priority-moderate"
      case Priority.High:
        return "bg-priority-high"
      case Priority.Critical:
        return "bg-priority-critical"
      default:
        return "bg-white"
    }
  }

  const getFormEntries = (target: HTMLFormElement) => {
    const data = new FormData(target)
    const entries = Object.fromEntries(data)
    return entries
  }

  function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const { updatedTitle, updatedContent } = getFormEntries(form)
    const updatedPriority = +(document.getElementById("priority-selector") as HTMLSelectElement).value as Priority
    const updatedTask: Task = {
      ...props.task,
      title: updatedTitle.toString() || props.task.title,
      content: updatedContent.toString() || props.task.content,
      priority: updatedPriority || props.task.priority,
      status: props.task.status
    }
    props.onEditTask(props.task, updatedTask)
    setIsEditing(false)
  }


  function handleUpdateStatus(newStatus: Status) {
    if (newStatus < Status.Todo || newStatus > Status.Done)
      return

    const updatedTask: Task = {
      ...props.task,
      status: newStatus
    }
    props.onUpdateTaskStatus(props.task, updatedTask)
  }

  if (isEditing) {
    return (
      <div className="w-11/12 h-24 flex items-center p-2 space-x-2 bg-primary-900">
        <div className={getPriorityColor() + " w-2 h-20"}>
        </div>
        <form className="w-full flex space-x-2" onSubmit={handleEdit}>
          <div className="w-10/12 flex flex-col space-y-2">
            <input name="updatedTitle" placeholder={props.task.title} className="font-bold text-xl w-full bg-primary-900 text-foreground border-2 border-primary-500 outline-none"></input>
            <input name="updatedContent" placeholder={props.task.content} className="font-light w-full bg-primary-900 text-foreground border-2 border-primary-500 outline-none"></input>
            <select id="priority-selector" className="w-4 h-2 bg-primary-900 text-foreground outline-none">
              <option value={Priority.Negligible}>Negligible</option>
              <option value={Priority.Low}>Low</option>
              <option value={Priority.Moderate}>Moderate</option>
              <option value={Priority.High}>High</option>
              <option value={Priority.Critical}>Critical</option>
            </select>
          </div>
          <div className="w-1/6 flex flex-col-reverse">
            <button className="w-full h-8 bg-primary-700 font-semibold" type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className="w-11/12 h-24 flex items-center p-2 space-x-2 bg-primary-900">
        <div className={getPriorityColor() + " w-2 h-20"}>
        </div>
        <div className="w-10/12 h-full flex flex-col text-start">
          <p className="font-bold text-xl">{props.task.title}</p>
          <p className="font-light">{props.task.content}</p>
        </div>
        <div className="w-1/6 h-full flex flex-col">
          <div className="w-full h-1/2 flex justify-end space-x-1">
            <button className="w-6 h-6 flex items-center justify-center bg-primary-600 hover:bg-primary-700 font-semibold" onClick={() => { handleUpdateStatus(props.task.status - 1) }}>
              <img src="/icons/left-icon.svg" alt="Left" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-primary-600 hover:bg-primary-700 font-semibold" onClick={() => { handleUpdateStatus(props.task.status + 1) }}>
              <img src="/icons/right-icon.svg" alt="Right" />
            </button>
          </div>
          <div className="w-full h-1/2 flex justify-end items-end space-x-1">
            <button className="w-6 h-6 flex items-center justify-center bg-primary-600 hover:bg-primary-700 font-semibold" onClick={() => { props.onRemoveTask(props.task); }}>
              <img className="w-5 h-5" src="/icons/remove-icon.svg" alt="Remove" />
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center bg-primary-600 hover:bg-primary-700 font-semibold"
              onClick={() => { setIsEditing(true) }}>
              <img className="w-5 h-5" src="/icons/edit-icon.svg" alt="Edit" />
            </button>
          </div>
        </div>
      </div>
    )
  }

}

