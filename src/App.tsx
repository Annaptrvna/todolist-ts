import React, {useReducer, useState} from 'react';
import './App.css';
import {v1, v4} from "uuid";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import {FilterValuesType, TasksType, TodolistType} from "./types/common";
import {AddItemForm, Todolist} from "./components/Todolist";
import {MenuButton} from "./components/MenuButton";
import {
    addTodolistAC, removeTodolistAC, todolistReducer, updateTodolistFilterAC, updateTodolistTitleAC
} from "./module/todolist-reducer";
import {
    addTaskAC,
    removeTaskAC,
    removeTodolistTasksAC,
    tasksReducer,
    updateTaskStatusAC, updateTaskTitleAC
} from "./module/tasks-reducer";


function App() {

    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasks(removeTodolistTasksAC(todolistId))
    }

    const removeTask = (todolistId: string, taskId: string) => {
      dispatchTasks(removeTaskAC(todolistId, taskId))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    }

    const addTodolist = (title: string)=>{
        dispatchTodolists(addTodolistAC(title))
    }

    const changeFilterValue = (todolistId: string, filter: FilterValuesType) => {
        dispatchTodolists(updateTodolistFilterAC(todolistId,filter))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(updateTaskStatusAC(todolistId, taskId, isDone))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(updateTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(updateTodolistTitleAC(todolistId, title))
    }


    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTodolists] = useReducer( todolistReducer,[
        {id:todolistId1, title: "What to learn", filter: "all"},
        {id:todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
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

    type ModeType = "dark" | "light"


    const [themeMode, setThemeMode] = useState<ModeType>("light")

    const theme = createTheme({
        palette: {
            primary: {
                main: "#C2E35EFF"
            }
        }
    })

    const onChangeThemeMode = () => {
        setThemeMode(themeMode === "light"? "dark" : "light")
    }
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                News
                            </Typography>
                            <Switch onChange={onChangeThemeMode}/>
                            <MenuButton color="inherit" >Login</MenuButton>
                            <MenuButton color="inherit" >Logout</MenuButton>
                            <MenuButton color="inherit" >FAQ</MenuButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container fixed style={{ marginTop:"20px"}}>
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
            </ThemeProvider>

        </div>
    );
}

export default App;
