export type TasksType = {
    [key: string]: TaskType[]
}


export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}
export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
