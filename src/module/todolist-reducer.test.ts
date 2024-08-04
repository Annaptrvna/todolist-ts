import {v1} from "uuid";
import {TodolistType} from "../types/common";
import {
    addTodolistAC,
    removeTodolistAC,
    RemoveTodolistActionType, todolistReducer,
    updateTodolistFilterAC,
    updateTodolistTitleAC
} from "./todolist-reducer";

let initialState: TodolistType[]
export let todolistId1: string
export let todolistId2: string
let title: string

beforeEach(()=> {
    todolistId1 = v1()
    todolistId2 = v1()
    title = "New Todolist"

    initialState =[
        {id:todolistId1, title: "What to learn", filter: "all"},
        {id:todolistId2, title: "What to buy", filter: "all"}]
})

test("Todolist should be removed", ()=>{
    const action = removeTodolistAC(todolistId1)
    const newState = todolistReducer(initialState, action)

    expect(newState.length).toBe(1)
    expect(initialState.length).toBe(2)
    expect(newState[0].id).toBe(todolistId2)
})

test("New todolist should be added", ()=>{
    const action = addTodolistAC(title)
    const newState = todolistReducer(initialState, action)

    expect(newState.length).toBe(3)
    expect(initialState.length).toBe(2)
    expect(newState[2].id).toBe(action.payload.id)
    expect(newState[2].title).toBe(action.payload.title)
    expect(newState[2].filter).toBe(action.payload.filter)
})

test("Todolist title should be updated", ()=>{
    const newState = todolistReducer(initialState, updateTodolistTitleAC(todolistId2, title) )

    expect(initialState[1].title).toBe("What to buy")
    expect(newState[1].title).toBe(title)
})

test("Todolist filter should be updated", ()=>{
    const newState = todolistReducer(initialState, updateTodolistFilterAC(todolistId2, "completed"))

    expect(initialState[1].filter).toBe("all")
    expect(newState[1].filter).toBe("completed")
})