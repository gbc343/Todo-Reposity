import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
//Importing Components
import Form from './Components/Form';
import TodoList from './Components/TodoList';
function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);
  
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
      default:
        setFilteredTodos(todos);
        break;

    }
  };

  //save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify([]));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
     let todoLocal =  localStorage.getItem("todos", JSON.stringify(todos));
     console.log(todoLocal)
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Gordons Todo list</h1>
      </header>
     <Form inputText= {inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
     <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
