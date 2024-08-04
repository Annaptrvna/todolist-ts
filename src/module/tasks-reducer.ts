import {TasksType} from "../types/common";
import {v1} from "uuid";

const REMOVE_TASK = "REMOVE-TASK"
const ADD_TASK = "ADD-TASK"
const UPDATE_TASK_STATUS = "UPDATE-TASK-STATUS"
const UPDATE_TASK_TITLE = "UPDATE-TASK-TITLE"
const REMOVE_TODOLIST_TASKS = "REMOVE-TODOLIST-TASKS"

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    payload: {
        todolistId: string
        taskId: string
    }
}
type RemoveTodolistTasksType = {
    type: "REMOVE-TODOLIST-TASKS"
    payload: {
        todolistId: string
    }
}

type AddTaskActionType = {
    type: "ADD-TASK"
    payload: {
        todolistId: string
        title: string
    }
}

type UpdateTaskStatusActionType = {
    type: "UPDATE-TASK-STATUS"
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

type UpdateTaskTitleActionType = {
    type: "UPDATE-TASK-TITLE"
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}


type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskStatusActionType
    | UpdateTaskTitleActionType
    | RemoveTodolistTasksType

export const tasksReducer = (state:TasksType, action: TasksActionsType): TasksType => {
    switch(action.type) {
        case REMOVE_TASK:
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].
                filter(t=>t.id !== action.payload.taskId )}
        case REMOVE_TODOLIST_TASKS:
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        case ADD_TASK:
            return {...state, [action.payload.todolistId]: [{id:v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]
                    ]}
        case UPDATE_TASK_STATUS:
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(
                td => td.id === action.payload.taskId ? {...td, isDone: action.payload.isDone}
                    : td
                )}
        case UPDATE_TASK_TITLE:
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(
                    td => td.id === action.payload.taskId ? {...td, title: action.payload.title}
                        : td
                )}
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, payload: {
        todolistId, taskId
        }} as const
}

export const removeTodolistTasksAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST_TASKS, payload: {
            todolistId
        }} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: ADD_TASK, payload: {
            todolistId, title
        }} as const
}

export const updateTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: UPDATE_TASK_STATUS, payload: {
        todolistId, taskId, isDone
        }} as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: UPDATE_TASK_TITLE, payload: {
            todolistId, taskId, title
        }} as const
}

