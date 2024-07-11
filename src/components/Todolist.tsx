import React, {ChangeEvent, KeyboardEvent, JSX, useRef, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType, TaskType, TodolistType} from "../types/common";
import {useAutoAnimate} from "@formkit/auto-animate/react";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilterValue: (todolistId: string, filter: FilterValuesType) =>  void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, taskTitle: string) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilterValue,
                             addTask,
                             changeTaskStatus,
                             changeTaskTitle,
                             todolistId,
                             removeTodolist,
                             changeTodolistTitle,
                             ...rest
                                }:TodolistPropsType) => {

    let tasksForTodolist = tasks

    if(rest.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    } if(rest.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    const onclickRemoveTaskHandler = (taskId: string) => removeTask(todolistId,taskId)
    const onChangeTaskStatusHandler = ( taskId: string, isDone: boolean) => changeTaskStatus(todolistId, taskId, isDone)
    const onChangeTaskTitleHandler = (taskId: string, title: string) => changeTaskTitle(todolistId, taskId, title)

    const tasksElements: Array<JSX.Element> | JSX.Element =
        tasks.length > 0 ? tasksForTodolist.map(task=>{
        return (
            <li key={task.id}>
                <input onChange={(e)=>onChangeTaskStatusHandler(task.id, e.currentTarget.checked)} type="checkbox" checked={task.isDone}/>
                <EditableSpan title={task.title} className={task.isDone ? "task-done": ""} editItemTitle={(title)=>onChangeTaskTitleHandler(task.id, title)}/>
                <Button name="x" onclickHandler={()=>onclickRemoveTaskHandler(task.id)}/>
            </li>
        )
    }) :
            <span>No tasks to complete</span>

    const addTaskHandler = (title: string) => {
            addTask(todolistId, title)
    }

    const onclickAllTasksHandler = () => changeFilterValue(todolistId, "all")
    const onclickCompletedTasksHandler = () => changeFilterValue(todolistId, "completed")
    const onclickActiveTasksHandler = () => changeFilterValue(todolistId, "active")
    const onClickRemoveTodolistHandler = () => removeTodolist(todolistId)

    const onClickChangeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId,title )
    }

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (
            <div>
                <button onClick={onClickRemoveTodolistHandler}>X</button>
                <EditableSpan title={title} editItemTitle={onClickChangeTodolistTitleHandler}/>
                {/*<h3>{title}</h3>*/}
                <AddItemForm onClick={addTaskHandler}/>
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

//-----------------------------------------------------------------------------

type AddItemFormPropsType = {
    onClick: (title: string) => void
}

export const AddItemForm = ({onClick} : AddItemFormPropsType) => {

    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState("")
    const onChangeTitleHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        if(title.trim()){
            onClick(title)
            setTitle("")
        } else {setError("Title should not be empty")}
    }
    const onKeyDownAddTaskHandler = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItemHandler()

    const disabledHandler =  !title || title.length >= 20
    const taskTitleLengthNotification = title.length > 20 && <div>Task title length should be below twenty letters </div>
    const taskEmptyTitleNotification = error && <div className={"error-message"}>Title is required</div>

    return (
        <div>
            <input
                value={title}
                onChange={(e)=>onChangeTitleHandler(e)}
                onKeyDown={onKeyDownAddTaskHandler}
                className={error? "error" : ""}
            />
            <Button name={"+"} onclickHandler={addItemHandler} disabled={disabledHandler}/>
            {taskTitleLengthNotification}
            {taskEmptyTitleNotification}
        </div>
    )
}

//-----------------------------------------------------------------------------

type EditableSpanPropsType = {
    title: string
    className?: string
    editItemTitle: (title: string) => void

}

const EditableSpan = ({title, className, editItemTitle} : EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [spanTitle, setSpanTitle] = useState("")
    const activateEditMode = () => {
        setSpanTitle(title)
        setEditMode(true)
    }
    const activateTaskMode = () => {
        setEditMode(false)
        editItemTitle(spanTitle)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent)=> {
        event.key === "Enter" && activateTaskMode()
    }

    return (
        editMode ? <input
                className={className}
                onKeyDown={(e)=>onKeyDownHandler(e)}
                value={spanTitle} onChange={onChangeTitleHandler}
                onBlur={activateTaskMode}
                type="text"
                autoFocus/>
            : <span
                onDoubleClick={activateEditMode}
                className={className}>{title}</span>
    )
}