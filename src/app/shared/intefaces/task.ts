export interface Task {
  id: string,
  title: string,
  status: string,
  isDisabled: boolean,
  prevTaskId?: string
}
