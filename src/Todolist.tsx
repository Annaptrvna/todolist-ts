import React, {JSX} from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
}

export type TaskPropsType = {
    id: number,
    isDone: boolean,
    title: string
}
export const Todolist = (props: TodolistPropsType) => {

    const tasksElements: Array<JSX.Element> = props.tasks.map(task=>{
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })

    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksElements}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    )
}