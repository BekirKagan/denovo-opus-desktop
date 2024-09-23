export enum Priority {
  Negligible,
  Low,
  Moderate,
  High,
  Critical
}

export enum Status {
  Todo,
  Doing,
  Done
}

export interface Task {
  title: string
  content: string
  priority: Priority
  status: Status
}
