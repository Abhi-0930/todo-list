import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4} from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const[todo,settodo]=useState("")
  const[todos,settodos]=useState([])
  const[showFinished,setshowFinished]=useState(true)
  useEffect(() =>{
      let todoString=localStorage.getItem("todos")
      if(todoString){
        let todos=JSON.parse(localStorage.getItem("todos"))
        settodos(todos)
      }
  },[])
  const saveToLS=(params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished=(e) => {
    setshowFinished(!showFinished)
  }
  


  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id==id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
     });
    
     settodos(newtodos)
     saveToLS()
  }
  const handleDelete=(e,id)=>{
    
     let newtodos=todos.filter(item=>{
      return item.id!==id
     });
    
     settodos(newtodos)
     saveToLS()
    
    }
  
  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
   
    saveToLS()
  }
  const handleChange=(e)=>{
    settodo(e.target.value)
  }
  const handleCheckbox=(e)=>{
  console.log(e,e.target)
   let id= e.target.name;
   let index=todos.findIndex(item=>{
    return item.id==id;
   })
   let newtodos=[...todos];
   newtodos[index].isCompleted=!newtodos[index].isCompleted;
   settodos(newtodos)
   saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh]">
        <h1 className='font-bold text-center text-xl'>TaskMaster Organize Your Day, Master Your Tasks!</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold'>Add a todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
        <button onClick={handleAdd} disabled={todo.length<=3}className='bg-violet-800 hover:bg-violet-950 p-3 py-1 disabled:bg-violet-700 text-sm font-bold text-white rounded-md '>Add</button>

      </div>
      <input onChange={toggleFinished}type="checkbox" checked={showFinished} className='mx-2'/>Show Finished
      <div className='h-[2px] bg-black my-3 opacity-80 mx-auto'></div>
      <h2 className='text-lg font-bold my-3'>Your Todo</h2>
        <div className="todos">
          {todos.length ===0 && <div className='font-bold text-md my-3 '> No todos to display</div>}
          {todos.map(item=>{

          
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/4 my-3 justify-between">
            <div className='flex gap-3'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id='' />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdOutlineDeleteOutline /></button>
            </div>

          </div>
          })}
        </div>
        
      </div>
    </>
  )
}

export default App
