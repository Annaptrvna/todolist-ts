import React, {JSX} from "react";
import {Button} from "./Button";
import {FilterValuesType, TaskPropsType} from "../types/common";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: number) => void
    changeFilterValue: (value: FilterValuesType) =>  void
}


export const Todolist = ({title, tasks, removeTask, changeFilterValue}:TodolistPropsType) => {


    const tasksElements: Array<JSX.Element> | JSX.Element =

        tasks.length > 0 ? tasks.map(task=>{
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>removeTask(task.id)}>X</button>
                <Button name="x" onclickHandler={()=>removeTask(task.id)}/>
            </li>
        )
    }) :
            <span>No tasks to complete</span>

    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button name={"+"}/>
                </div>
                <ul>
                    {tasksElements}
                </ul>
                <div>
                    <Button onclickHandler={()=>changeFilterValue("all")} name={"All"}/>
                    <Button onclickHandler={()=>changeFilterValue("active")} name={"Active"}/>
                    <Button onclickHandler={()=>changeFilterValue("completed")} name={"Completed"}/>
                </div>
            </div>
    )
}