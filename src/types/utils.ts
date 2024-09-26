import { Priority, Status, Task } from './task'

const PriorityMap = {
  [Priority.Negligible]: "Negligible",
  [Priority.Low]: "Low",
  [Priority.Moderate]: "Moderate",
  [Priority.High]: "High",
  [Priority.Critical]: "Critical",
};

const StatusMap = {
  [Status.Todo]: "Todo",
  [Status.Doing]: "Doing",
  [Status.Done]: "Done",
};

function convertTaskForRust(task: Task) {
  return {
    ...task,
    priority: PriorityMap[task.priority],
    status: StatusMap[task.status],
  };
}

export function convertTasksForRust(tasks: Task[]) {
  return tasks.map(convertTaskForRust);
}
