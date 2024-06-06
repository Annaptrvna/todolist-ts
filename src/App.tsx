import React, {useState} from 'react';
import './App.css';
import { Todolist} from "./components/Todolist";
import {FilterValuesType, TaskPropsType} from "./types/common";
import {v4} from "uuid";

function App() {
    const todolistTitle = "What to do"
    const tasks_1: Array<TaskPropsType> = [
        {id: v4(), title: "HTML", isDone: true},
        {id: v4(), title: "JS", isDone: true},
        {id: v4(), title: "CSS", isDone: false},
    ]
    const todolistTitle_1 = "What to buy"
    const tasks_2: Array<TaskPropsType> = [
        {id: v4(), title: "Bread", isDone: false},
        {id: v4(), title: "Milk", isDone: true},
        {id: v4(), title: "Butter", isDone: false},
    ]

    const [tasks, setTasks] = useState<Array<TaskPropsType>>(tasks_1)
    const [filterValue, setFilterValue] = useState<FilterValuesType>("all")
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task=>task.id !== taskId))
    }

    const addTask = (title: string) => {
        let newTask = {id: v4(), title: title, isDone: false}
        setTasks([...tasks, newTask])
    }

    const changeFilterValue = (value: FilterValuesType) => {
        setFilterValue(value)
    }

    let filteredTasks = tasks
    if(filterValue === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    } if(filterValue === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title= {todolistTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilterValue={changeFilterValue}
                addTask={addTask}
            />
            {/*<Todolist title= {todolistTitle_1} tasks={tasks_1}/>*/}
        </div>
    );
}

export default App;
