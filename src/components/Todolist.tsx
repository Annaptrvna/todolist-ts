import React, {ChangeEvent, KeyboardEvent, JSX, useRef, useState} from "react";
import {UniversalButton} from "./Button";
import {FilterValuesType, TaskType, TodolistType} from "../types/common";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Checkbox, IconButton, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {ControlPoint} from "@mui/icons-material";



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

    const onClickRemoveTaskHandler = (taskId: string) => removeTask(todolistId,taskId)
    const onChangeTaskStatusHandler = ( taskId: string, isDone: boolean) => changeTaskStatus(todolistId, taskId, isDone)
    const onChangeTaskTitleHandler = (taskId: string, title: string) => changeTaskTitle(todolistId, taskId, title)

    const tasksElements: Array<JSX.Element> | JSX.Element =
        tasks.length > 0 ? tasksForTodolist.map(task=>{
        return (
            <li key={task.id}>
                <Checkbox onChange={(e)=>onChangeTaskStatusHandler(task.id, e.currentTarget.checked)} checked={task.isDone}/>
                <EditableSpan oldTitle={task.title} className={task.isDone ? "task-done": ""} editItemTitle={(title)=>onChangeTaskTitleHandler(task.id, title)}/>
               <IconButton onClick={()=>onClickRemoveTaskHandler(task.id)}><DeleteIcon/></IconButton>
            </li>
        )
    }) :
            <span>No tasks to complete</span>

    const addTaskHandler = (title: string) => {
            addTask(todolistId, title)
    }

    const onClickAllTasksHandler = () => changeFilterValue(todolistId, "all")
    const onClickCompletedTasksHandler = () => changeFilterValue(todolistId, "completed")
    const onClickActiveTasksHandler = () => changeFilterValue(todolistId, "active")
    const onClickRemoveTodolistHandler = () => removeTodolist(todolistId)

    const onClickChangeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId,title )
    }

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (
            <div>
                <EditableSpan oldTitle={title} editItemTitle={onClickChangeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={onClickRemoveTodolistHandler}><DeleteIcon/></IconButton>
                {/*<h3>{title}</h3>*/}
                <AddItemForm onClick={addTaskHandler}/>
                <ul ref={listRef}>
                    {tasksElements}
                </ul>
                <div>
                    <Button onClick={onClickAllTasksHandler} name={"All"} variant={rest.filter=== "all" ? "contained" : "text"}>All</Button>
                    <Button onClick={onClickActiveTasksHandler} name={"Active"} variant={rest.filter=== "active" ? "contained" : "text"}>Active</Button>
                    <Button onClick={onClickCompletedTasksHandler} name={"Completed"} variant={rest.filter=== "completed" ? "contained" : "text"}>Completed</Button>
                    {/*<UniversalButton variant={"contained"} onclickHandler={onclickActiveTasksHandler} name={"Active"} className={rest.filter==="active" ? "active" : ""}/>*/}
                    {/*<UniversalButton variant={"contained"} onclickHandler={onclickCompletedTasksHandler} name={"Completed"} className={rest.filter==="completed" ? "active" : ""}/>*/}
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
    const onChangeTitleHandler  = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <TextField
                value={title}
                onChange={(e)=>onChangeTitleHandler(e)}
                onKeyDown={onKeyDownAddTaskHandler}
                label={"Type value"}
                error={!!error}
                helperText={error}
            />
            <IconButton  name={"+"} onClick={addItemHandler} disabled={disabledHandler}><ControlPoint/></IconButton>
            {taskTitleLengthNotification}
            {taskEmptyTitleNotification}
        </div>
    )
}

//-----------------------------------------------------------------------------

type EditableSpanPropsType = {
    oldTitle: string
    className?: string
    editItemTitle: (title: string) => void

}

const EditableSpan = ({oldTitle, className, editItemTitle} : EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const activateEditMode = () => {
        setNewTitle(oldTitle)
        setEditMode(true)
    }
    const activateTaskMode = () => {
        setEditMode(false)
        editItemTitle(newTitle)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent)=> {
        event.key === "Enter" && activateTaskMode()
    }

    return (
        editMode ? <input
                className={className}
                onKeyDown={(e)=>onKeyDownHandler(e)}
                value={newTitle} onChange={onChangeTitleHandler}
                onBlur={activateTaskMode}
                type="text"
                autoFocus/>
            : <span
                onDoubleClick={activateEditMode}
                className={className}>{oldTitle}</span>
    )
}