import React, { useState } from 'react';


function Todo() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) ||[]);

    React.useEffect(() =>{
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])
    const [inputValue, setinputValue] = useState("")

    function handleChange(e){
        setinputValue(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if (inputValue) {
            const newTasks = [...tasks, { id: tasks.length+1 ,title: inputValue, completed: false }];
            setTasks(newTasks)
            setinputValue("")
          }
    }

    function toggleComplete(id){
        setTasks(tasks.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ))
    }

    function toggleDelete(id){
        setTasks(tasks.filter((todo) => todo.id !== id))
    }

    const taskelement = tasks.map( (item, index) => {  
        return <div className={`${item.completed ? 'completed task-item' : "task-item"}`} key={index}>{item.title}
        <button onClick={() => toggleComplete(item.id)}>Complete</button>
        <button className='delete-btn' onClick={() => toggleDelete(item.id)}>Delete</button>

        </div>
    })
    
    return (
        <>
            <form className="todo-form" onSubmit={handleSubmit}>
                    {taskelement}
                    <input type="text" value={inputValue} className="todo-input" placeholder="What is the task today?" onChange={handleChange} maxLength={15}/>
                    <button type="submit">ADD TASK</button>
            </form>
        </>
    )
  }
  
  export default Todo
  