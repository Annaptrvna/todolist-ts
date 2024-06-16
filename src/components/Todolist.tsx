import React, {ChangeEvent, KeyboardEvent, JSX, useRef, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType, TaskPropsType} from "../types/common";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    changeFilterValue: (value: FilterValuesType) =>  void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}


export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilterValue,
                             addTask,
                             changeTaskStatus
                                }:TodolistPropsType) => {

    const tasksElements: Array<JSX.Element> | JSX.Element =

        tasks.length > 0 ? tasks.map(task=>{
            const onclickRemoveTaskHandler = () => removeTask(task.id)
            const onChangeTaskStatus = (taskId: string, isDone: boolean) => {
                changeTaskStatus(taskId, isDone)
            }
        return (
            <li key={task.id}>
                <input onChange={(e)=>onChangeTaskStatus(task.id, e.currentTarget.checked)} type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button name="x" onclickHandler={onclickRemoveTaskHandler}/>
            </li>
        )
    }) :
            <span>No tasks to complete</span>
    const [titleValue, setTitleValue] = useState("")
    const onchangeTitleHandler  = (e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.currentTarget.value)

    const addTaskHandler = () => {
         addTask(titleValue)
        setTitleValue("")

    }
    const onkeydownAddTaskHandler = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const onclickAllTasksHandler = () => changeFilterValue("all")
    const onclickCompletedTasksHandler = () => changeFilterValue("active")
    const onclickActiveTasksHandler = () => changeFilterValue("completed")

    const disabledHandler =  !titleValue || titleValue.length >= 20
    const taskTitleNotification = titleValue.length > 20 && <div>Task title length should be below twenty letters </div>

    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input
                        value={titleValue}
                        onChange={(e)=>onchangeTitleHandler(e)}
                        onKeyDown={onkeydownAddTaskHandler}
                    />
                    <Button name={"+"} onclickHandler={addTaskHandler} disabled={disabledHandler}/>
                    {taskTitleNotification}
                </div>
                <ul>
                    {tasksElements}
                </ul>
                <div>
                    <Button onclickHandler={onclickAllTasksHandler} name={"All"}/>
                    <Button onclickHandler={onclickActiveTasksHandler} name={"Active"}/>
                    <Button onclickHandler={onclickCompletedTasksHandler} name={"Completed"}/>
                </div>
            </div>
    )
}