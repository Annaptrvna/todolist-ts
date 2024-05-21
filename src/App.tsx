import React from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./components/Todolist";

function App() {
    const tasks: Array<TaskPropsType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "CSS", isDone: false},
    ]

    const tasks_1: Array<TaskPropsType> = [
        {id: 4, title: "Bread", isDone: false},
        {id: 5, title: "Milk", isDone: true},
        {id: 6, title: "Butter", isDone: false},
    ]
    return (
        <div className="App">
            <Todolist title="What to do" tasks={tasks}/>
            <Todolist title="What to buy" tasks={tasks_1}/>
        </div>
    );
}

export default App;
