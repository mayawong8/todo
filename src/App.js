import './App.css';
import React,{useEffect, useState} from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescr, setDescr] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);

  const handleAddTodo = ()=>{
    let newTodoItem = {
      title: newTitle,
      description: newDescr
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoArr));

    //resets input text boxes
    setTitle('');
    setDescr('');
  }
  const handleDeleteTodo = index =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(reducedTodo));
    setTodos(reducedTodo)
  }
  const handleDeleteCompletedTodo = index =>{
    let reducedCompletedTodo = [...completedTodo];
    reducedCompletedTodo.splice(index, 1);
    localStorage.setItem('completedList', JSON.stringify(reducedCompletedTodo));
    setCompletedTodo(reducedCompletedTodo)
  }

  const handleCompleteTodo = index =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }
    //add this todo to complete list
    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    localStorage.setItem('completedList', JSON.stringify(updatedCompletedArr));
    //remove task from todo
    handleDeleteTodo(index);
  }

  useEffect(()=> {
    let savedTodo = JSON.parse(localStorage.getItem('todoList'));
    let savedCompleted = JSON.parse(localStorage.getItem('completedList'));
    // if nothing in savedTodo's so not store that
    //else map each item using setTodos
    if (savedTodo){
      setTodos(savedTodo);
    }
    if (savedCompleted){
      setCompletedTodo(savedCompleted);
    }
  },[])



  return (
    <div className="App">
      <h1>My Todos</h1>
        <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=> setTitle(e.target.value)} placeholder='What is the title?'></input>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescr} onChange={(e)=> setDescr(e.target.value)} placeholder='What is the description?'></input>
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primaryBtn' onClick={handleAddTodo}>Add</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
        {isCompleteScreen===false && allTodos.map ((item, index)=>{
          return (
            <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          
            <div>
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
              <BsCheckLg className='check-icon' onClick={()=>handleCompleteTodo(index)}/>
            </div>
          </div>
          )
        })}
        {isCompleteScreen===true && completedTodo.map ((item, index)=>{
          return (
            <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on {item.completedOn}</small></p>
            </div>
          
            <div>
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}/>
            </div>
          </div>
          )
        })}
        </div>
        </div>
        
    
    </div>
  );
}

export default App;
