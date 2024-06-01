import { useState,useEffect } from "react"
import axios from "axios";

function App(){
  
  const [enteredvalue,setevalue] =useState("")
  const [fruit,setfruit] = useState([])
  const [dvalue,setdvalue] = useState("")


  useEffect(()=>{
   
  axios.get("https://todo-week11-server.vercel.app/fruitlist").then(function(data){
   
     setfruit(data.data)
  })
  }, [])

  function handlevalue(evt)
  {
    setevalue(evt.target.value)
  }

  function add(){
    if (enteredvalue.trim() === '') {
      alert('Item name cannot be empty');
      return;
    }
    axios.post("https://todo-week11-server.vercel.app/addfruit",{newfruit:enteredvalue})
   .then(function(response){ setfruit([...fruit,response.data])
    setevalue("")
    console.log(fruit)})
}
function deleteitem(id){
console.log(id)
axios.post("http://localhost:5001/delfruit",{did:id})
setfruit(fruit.filter(item => item._id !== id))
}
console.log(fruit)
return (
  <div>
    <input value={enteredvalue} type="text" onChange={handlevalue}></input>
    <button onClick={add}>Add</button>
    {
      fruit.map(function(item){
        return <div>
          <h1>{item.name}</h1>
        <button style={{display:"inline"}} onClick={()=>deleteitem(item._id)}>Delete</button>
        </div>
      })
    }
  </div>
);
}

export default App;
