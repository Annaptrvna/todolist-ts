import React, {useState} from 'react';
import './App.css';
import { Todolist} from "./components/Todolist";
import {FilterValuesType, TasksType, TodolistType} from "./types/common";
import {v1} from "uuid";



function App() {

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(td=> td.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const removeTask = (todolistId: string, taskId: string) => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t=>t.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeFilterValue = (todolistId: string, filter: FilterValuesType) => {
        setTodolists( todolists.map(tl => tl.id === todolistId ? {...tl, filter:filter} : tl))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((t)=>t.id===taskId?{...t, isDone: isDone} : t)})
    }


    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>( [
        {id:todolistId1, title: "What to learn", filter: "all"},
        {id:todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksType>({
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
                // let tasksForTodolist = tasks[tl.id]
                // if(tl.filter === "completed") {
                //     tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                // } if(tl.filter === "active") {
                //     tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                // }
            return (
            <Todolist
                todolistId={tl.id}
                title= {tl.title}
                tasks={tasks[tl.id]}
                filter={tl.filter}
                removeTodolist={removeTodolist}
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
