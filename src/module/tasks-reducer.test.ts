import {TasksType} from "../types/common";
import {todolistId1, todolistId2} from "./todolist-reducer.test";
import {v1} from "uuid";
import {
    addTaskAC,
    removeTaskAC, removeTodolistTasksAC,
    tasksReducer,
    updateTaskStatusAC,
    updateTaskTitleAC
} from "./tasks-reducer";

let tasks: TasksType


beforeEach(()=> {
    tasks = {
        [todolistId1]:[
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todolistId2]:[
            {id: v1(), title: "Python", isDone: true},
            {id: v1(), title: "Java", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ]
    }
})

test("Task reducer should remove task", ()=>{
    const action = removeTaskAC(todolistId2, tasks[todolistId2][0].id)
    const newState = tasksReducer(tasks, action)

    expect(tasks[todolistId2].length).toBe(3)
    expect(newState[todolistId2].length).toBe(2)
    expect(newState[todolistId2][0]).toBe(tasks[todolistId2][1])
    expect(newState[todolistId2][1]).toBe(tasks[todolistId2][2])
})
test("Task reducer should remove all tasks by todolistId", ()=>{
    debugger
    const action = removeTodolistTasksAC(todolistId1)
    const newState = tasksReducer(tasks, action)

    expect(Object.keys(tasks).length).toBe(2)
    expect(Object.keys(newState).length).toBe(1)
    expect(Object.keys(newState)[0]).toBe(todolistId2)
})

test("Task reducer should add task", ()=>{
    const action = addTaskAC(todolistId1, "New Task Title")
    const newState = tasksReducer(tasks, action)

    expect(tasks[todolistId1].length).toBe(3)
    expect(newState[todolistId1].length).toBe(4)
    expect(newState[todolistId1][0].title).toBe("New Task Title")
    expect(newState[todolistId1][0].isDone).toBe(false)
})

test("Task reducer should update task status", ()=>{
    const action = updateTaskStatusAC(todolistId2, tasks[todolistId2][2].id, true)
    const newState = tasksReducer(tasks, action)

    expect(tasks[todolistId2][2].isDone).toBe(false)
    expect(newState[todolistId2][2].isDone).toBe(true)

})

test("Task reducer should update task status", ()=>{
    const updated_title = "Updated Task Title"
    const action = updateTaskTitleAC(todolistId2, tasks[todolistId2][0].id, "Updated Task Title")
    const newState = tasksReducer(tasks, action)

    expect(tasks[todolistId2][0].title).toBe("Python")
    expect(newState[todolistId2][0].title).toBe(updated_title)

})

