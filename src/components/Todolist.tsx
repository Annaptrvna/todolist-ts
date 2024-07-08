import React, {ChangeEvent, KeyboardEvent, JSX, useRef, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "../types/common";
import {useAutoAnimate} from "@formkit/auto-animate/react";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilterValue: (todolistId: string, filter: FilterValuesType) =>  void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}


export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilterValue,
                             addTask,
                             changeTaskStatus,
                             todolistId,
                             removeTodolist,
                             ...rest
                                }:TodolistPropsType) => {

    let tasksForTodolist = tasks
    if(rest.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    } if(rest.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    const tasksElements: Array<JSX.Element> | JSX.Element =
        tasks.length > 0 ? tasksForTodolist.map(task=>{
            const onclickRemoveTaskHandler = () => removeTask(todolistId,task.id)
            const onChangeTaskStatus = ( taskId: string, isDone: boolean) => changeTaskStatus(todolistId, taskId, isDone)
        return (
            <li key={task.id}>
                <input onChange={(e)=>onChangeTaskStatus(task.id, e.currentTarget.checked)} type="checkbox" checked={task.isDone}/>
                <span className={task.isDone ? "task-done": ""}>{task.title}</span>
                <Button name="x" onclickHandler={onclickRemoveTaskHandler}/>
            </li>
        )
    }) :
            <span>No tasks to complete</span>


    const [titleValue, setTitleValue] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onchangeTitleHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitleValue(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if(titleValue.trim()){
            addTask(todolistId, titleValue)
            setTitleValue("")
        } else {setError("Task title should not be empty")}
    }
    const onkeydownAddTaskHandler = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()


    const onclickAllTasksHandler = () => changeFilterValue(todolistId, "all")
    const onclickCompletedTasksHandler = () => changeFilterValue(todolistId, "completed")
    const onclickActiveTasksHandler = () => changeFilterValue(todolistId, "active")
    const onClickRemoveTodolistHandler = () => removeTodolist(todolistId)

    const disabledHandler =  !titleValue || titleValue.length >= 20
    const taskTitleLengthNotification = titleValue.length > 20 && <div>Task title length should be below twenty letters </div>
    const taskEmptyTitleNotification = error && <div className={"error-message"}>Title is required</div>
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (
            <div>
                <button onClick={onClickRemoveTodolistHandler}>X</button>
                <h3>{title}</h3>
                <div>
                    <input
                        value={titleValue}
                        onChange={(e)=>onchangeTitleHandler(e)}
                        onKeyDown={onkeydownAddTaskHandler}
                        className={error? "error" : ""}
                    />
                    <Button name={"+"} onclickHandler={addTaskHandler} disabled={disabledHandler}/>
                    {taskTitleLengthNotification}
                    {taskEmptyTitleNotification}:x:
                </div>
                <ul ref={listRef}>
                    {tasksElements}
                </ul>
                <div>
                    <Button onclickHandler={onclickAllTasksHandler} name={"All"} className={rest.filter==="all" ? "active" : ""}/>
                    <Button onclickHandler={onclickActiveTasksHandler} name={"Active"} className={rest.filter==="active" ? "active" : ""}/>
                    <Button onclickHandler={onclickCompletedTasksHandler} name={"Completed"} className={rest.filter==="completed" ? "active" : ""}/>
                </div>
            </div>
    )
}