import { useState,useEffect } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setShowfinished] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("todos");
    if (data){

      setTodos(JSON.parse(data));
    
    } 
  },[])
  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const handlechange = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd =  () => {
   setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLs()
  };           
             
  const handledit = (e,id) => {
let t= todos.filter(i=>i.id === id)
setTodo(t[0].todo)
let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLs()
  };




  const handledelete = (e,id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLs()


  };
  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => item.id === id)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos)
    saveToLs()
  };
  const toggle = () => {setShowfinished(!showfinished)}
  return (
    <>
      <Navbar />
      <div className="bg-violet-200 min-h-[80vh] mx-3 overflow-auto md:mx-auto my-5 w-1/2">
        <h2 className="text-xl font-bold py-4 px-3"> Add a Todo</h2>
        <div className="input p-3 flex flex-col gap-2">
          <input 
            onChange={handlechange}
            value={todo}
            className="w-full "
            type="text"
            autoFocus
          />
          <button
            onClick={handleAdd} disabled={!todo}
            className="bg-violet-700 w-full cursor-pointer rounded-md text-white font-bold"
          >
           Save
          </button>
        </div>
        <input onChange={toggle} type="checkbox" checked = {showfinished}  id="" />show finished todos
        <h2 className="text-xl font-bold py-4 px-3">Your Todos</h2>
        {todos.length === 0 && <div className="text-center text-xl font-bold">No Todos</div>}
        {todos.map((item) => (
          (showfinished || !item.isCompleted) &&
          <div key={item.id} className="todos p-2 flex justify-between mb-[12px] ">
            <div
             
              className={`text w-2xs gap-2  items-center flex  ${
                item.isCompleted ?"line-through":""
              } `}
            >
              <input onChange={handlecheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
              <h2 className="  first-letter:capitalize">{item.todo} </h2>
            </div>
            <div className="buttons flex gap-4">

 
            <button
              onClick={(e)=>handledit(e,item.id)}
              className="bg-violet-700 w-12 rounded-md text-white font-bold "
            >
              Edit
            </button>
            <button
              onClick={(e)=>handledelete(e,item.id)}
              className="bg-violet-700 w-16 rounded-md text-white font-bold "
            >
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
