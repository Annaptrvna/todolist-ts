import {FilterValuesType, TodolistType} from "../types/common";
import {v1} from "uuid";

export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const UPDATE_TODOLIST_TITLE = "UPDATE-TODOLIST-TITLE"
export const UPDATE_TODOLIST_FILTER = "UPDATE-TODOLIST-FILTER"

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
        id: string
    }
}

type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    payload: {
        id: string
        title: string
        filter: FilterValuesType
    }
}

type UpdateTodolistTitleActionType = {
    type: "UPDATE-TODOLIST-TITLE"
    payload: {
        id: string
        title: string

    }
}

type UpdateTodolistFilterActionType = {
    type: "UPDATE-TODOLIST-FILTER"
    payload: {
        id: string
        filter: FilterValuesType
    }
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | UpdateTodolistFilterActionType | UpdateTodolistTitleActionType

export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch(action.type) {
        case REMOVE_TODOLIST:
            return state.filter(td=>td.id !== action.payload.id)
        case ADD_TODOLIST:
            const newTodolist = {id: action.payload.id, title: action.payload.title, filter: action.payload.filter}
            return [...state, newTodolist ]
        case UPDATE_TODOLIST_FILTER:
            return state.map(td => td.id === action.payload.id? {...td, filter: action.payload.filter}: td)
        case UPDATE_TODOLIST_TITLE:
            return state.map(td => td.id === action.payload.id? {...td, title: action.payload.title}: td)
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {type: REMOVE_TODOLIST, payload: {id}} as const
}
export const addTodolistAC = (title: string) => {
    return {type: ADD_TODOLIST, payload: {id: v1(), title, filter: "all"}} as const
}

export const updateTodolistTitleAC = (id: string, title:string) => {
    return {type: UPDATE_TODOLIST_TITLE, payload: {id, title}} as const
}

export const updateTodolistFilterAC = (id: string, filter:FilterValuesType) => {
    return {type: UPDATE_TODOLIST_FILTER, payload: {id, filter}} as const
}