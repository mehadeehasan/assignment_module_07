import React, { useEffect, useState } from 'react'
import '../assets/css/style.css'

export default function todo() {
  const [isShowDisply, setIsShowDisply ]=useState(false);
  const [allTodos, setAllTodos ] =useState([]);
  const [newTitle, setNewTitle ] =useState('');
  const [newDescription, setNewDescription ] =useState('');

  const addToDo = ()=>{
    let newTodoItem = {
        title: newTitle,
        description: newDescription
    }
    let updatedToDo = [...allTodos];
    updatedToDo.push(newTodoItem);
    setAllTodos(updatedToDo);
    localStorage.setItem('todolist',JSON.stringify(updatedToDo));
  }
  useEffect(()=>{
    let savedTodo= JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo){
        setAllTodos(savedTodo);
    }
  },[])
  const handleClick = (index)=>{
    let reduceTodo=[...allTodos];
    reduceTodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
  }
  return (
    <>
        <h1>To Do List</h1>
        
        <div className="todo-wrapper">
            <div className="todo-input">
                <div className="todo-input-item">
                    <label>Title</label>
                    <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} 
                    placeholder='Please insert a title here' />
                </div>
                <div className="todo-input-item">
                    <label>Discription</label>
                    <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} 
                    placeholder='Please insert a description of title here' />
                </div>
                <div className="todo-input-item">
                    <button type='button' onClick={addToDo} className='primaryBtn'>Add</button>
                </div>                
            </div>
            <div className="btn-area">
                <div>
                    <button className='secondaryBtn'>ToDo</button>
                    <button className='secondaryBtn'>Comlited</button>
                </div>
            </div>
            <div className="todo-list">
                {allTodos.map((item,index)=>{
                    return(
                        <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <button onClick={()=>handleClick(index)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
                
                
            </div>
        </div>
       
    </>
  )
}
