import React, {useState} from 'react';
import './App.css';
import { Todolist} from "./components/Todolist";
import {FilterValuesType, TasksType, TodolistType} from "./types/common";
import {v1} from "uuid";



function App() {

    const removeTask = (taskId: string) => {
        // setTasks(tasks.filter(task=>task.id !== taskId))
    }

    const addTask = (title: string) => {
        // let newTask = {id: v4(), title: title, isDone: false}
        // setTasks([...tasks, newTask])
    }

    const changeFilterValue = (todolistId: string, filter: FilterValuesType) => {
        // setTodolists( todolists.map(tl => tl.id === todolistId ? {...tl, filter:filter} : tl))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // const changedTasks = tasks.map(t => t.id === taskId ? {...t, isDone:isDone}:t)
        // setTasks(changedTasks)
    }


    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>( [
        {id:todolistId1, title: "What to learn", filter: "all"},
        {id:todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksType >({
        [todolistId1]:[
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
       [todolistId2]:[
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
       }
   )

    return (
        <div className="App">
            {todolists.map(tl=>{
                let tasksForTodolist = tasks[tl.id]
                if(tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                } if(tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }
            return (
            <Todolist
                todolistId={tl.id}
                title= {tl.title}
                tasks={tasksForTodolist}
                filter={tl.filter}
                removeTask={removeTask}
                changeFilterValue={changeFilterValue}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                />
                )})}
        </div>
    );
}

export default App;
