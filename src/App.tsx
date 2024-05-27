import React, {useState} from 'react';
import './App.css';
import { Todolist} from "./components/Todolist";
import {FilterValuesType, TaskPropsType} from "./types/common";

function App() {
    const todolistTitle = "What to do"
    const tasks_1: Array<TaskPropsType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "CSS", isDone: false},
    ]
    const todolistTitle_1 = "What to buy"
    const tasks_2: Array<TaskPropsType> = [
        {id: 4, title: "Bread", isDone: false},
        {id: 5, title: "Milk", isDone: true},
        {id: 6, title: "Butter", isDone: false},
    ]

    const [tasks, setTodolistTasks] = useState<Array<TaskPropsType>>(tasks_1)
    const [filterValue, setFilterValue] = useState<FilterValuesType>("all")
    const removeTask = (taskId: number) => {
        setTodolistTasks(tasks.filter(task=>task.id !== taskId))
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
            <Todolist title= {todolistTitle} tasks={filteredTasks} removeTask={removeTask} changeFilterValue={changeFilterValue}/>
            {/*<Todolist title= {todolistTitle_1} tasks={tasks_1}/>*/}
        </div>
    );
}

export default App;
