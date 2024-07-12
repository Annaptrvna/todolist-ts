import React, {useState} from 'react';
import './App.css';
import {AddItemForm, Todolist} from "./components/Todolist";
import {FilterValuesType, TasksType, TodolistType} from "./types/common";
import {v1} from "uuid";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Menu} from "@mui/icons-material";



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

    const addTodolist = (title: string)=>{
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id:newTodolistId, title, filter: "all"}
        setTodolists([...todolists, newTodolist ])
        setTasks({...tasks, [newTodolistId]:[]})
    }

    const changeFilterValue = (todolistId: string, filter: FilterValuesType) => {
        setTodolists( todolists.map(tl => tl.id === todolistId ? {...tl, filter:filter} : tl))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((t)=>t.id===taskId?{...t, isDone: isDone} : t)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((t)=>t.id===taskId?{...t, title: title} : t)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(td => td.id === todolistId? {...td, title}:td))
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding:"10px"}}>
                <Grid container>
                    <AddItemForm onClick={addTodolist}/>
                </Grid>
                <Grid container spacing={10} style={{paddingTop:"30px"}} >
                    {todolists.map(tl=>{
                        // let tasksForTodolist = tasks[tl.id]
                        // if(tl.filter === "completed") {
                        //     tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                        // } if(tl.filter === "active") {
                        //     tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                        // }
                        return (
                            <Grid item >
                                <Paper style={{padding:"10px"}}>
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
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />

                                </Paper>

                            </Grid>

                        )})}
                </Grid>

            </Container>

        </div>
    );
}

export default App;
