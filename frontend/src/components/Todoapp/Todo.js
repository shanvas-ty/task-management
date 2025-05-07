import React, { useEffect, useState } from 'react'
import "./Todo.css"
import AddTask from './AddTask'
import ListTasks from './ListTasks'


const Todo = () =>{
    
    //1. create dummy data
    // const [tasks,setTasks] = useState([
    //     {title:"Learn HTML"},
    //     {title:"Learn CSS"},
    //     {title:"Learn JAVASCRIPT"},
    // ])
    
    const [tasks,setTasks] = useState([])
    useEffect(()=>{
      document.title=`You have ${tasks.length} pending tasks`
      
    })

    const addTask = (title) =>{
        const newTask =[...tasks,{title}]
        setTasks(newTask)
    }

    const removeTask = (index)=>{
      const newTask =[...tasks]
      newTask.splice(index,1)
      setTasks(newTask)
    }
  return (
    <>
      <div className="todo-container">
        <div className="header">TODO APP</div>
        <div className="add-task">
            <AddTask addTask={addTask}/>
        </div>
        <div className="tasks">
            {tasks.map((task,index)=>(
                <ListTasks task={task} removeTask={removeTask} index={index} key={index}/>
            ))}
            
        </div>   
      </div>
    </>
  )
}

export default Todo