import React from 'react'
import {useState} from "react"

const AddTask = ({addTask}) => {
    const[value,setValue]=useState("")
    const addItem = ()=>
    {
        // // console.log(value)
        // addTask(value)
        // setValue("")
        if (value === "") {
            alert("Enter a value");
        } else {
            addTask(value);
            setValue(""); // clear input after adding task
        }
    };
    
  return (
    <>
        <div className="input-container">
            <input type="text" className="input" placeholder="Add a new Task" value={value}
            onChange={(e)=>{
                setValue(e.target.value)
            }}
            
            />
            <button onClick={()=>addItem()} className="add-btn">ADD</button>
        </div>
    </>
  )
}

export default AddTask