import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { EmployeeData } from './EmployeeData'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)
  useEffect(()=>{
      setData(EmployeeData)
  },[])

  const handleEdit=(id)=>{
    if(id>0){
      const dt=data.filter(item=>item.id===id)
      if(dt!==undefined){
        setIsUpdate(true)
        setId(id)
        setFirstname(dt[0].firstname)
      setLastname(dt[0].lastname)
      setAge(dt[0].age)
      }
    }
  }
  
  const handledelete=(id)=>{
    window.confirm("Are you sure to delete it")
   if(id>0){
    const dt=data.filter(item=>item.id!==id)
    setData(dt)
   }
    
  }
  const handleSave=(e)=>{
    let error='';
    if(firstname==='')
      error+='First name is rquired'
    if(lastname==='')
      error+='Last name is rquired'
    if(age<=0)
      error+='Age is required'
    if(error===''){
    e.preventDefault();
    const dt=[...data];
    const newObject= {
      
        id:EmployeeData.length+1,
        firstname:firstname,
        lastname:lastname,
        age:age
  
  }
  dt.push(newObject);
  setData(dt)
}
else{
  alert(error)
}


}
  const handleUpdate=()=>{
    const index=data.map((item)=>{
      return(item.id)}
    ).indexOf(id)
    const dt=[...data];
    dt[index].firstname=firstname;
    dt[index].lastname=lastname;
    dt[index].age=age;
    setData(dt)
    handleClear();

    
  }
  const handleClear=()=>{
    setIsUpdate(false)
    setId(0)
    setFirstname('')
  setLastname('')
  setAge(0)
  
  }

  return (
    <>
     <div className="App table-responsive">
        <div style={{ display:"flex", flexWrap:"wrap", gap: "10px", justifyContent:"center", marginTop: "10px", marginBottom:"10px"}}>
          <div>
            <label htmlFor="fname"> First Name:
              <input type="text" name='fname' placeholder='Enter First name' onChange={(e)=>setFirstname(e.target.value)} value={firstname} />
            </label>
            <label htmlFor="lname"> Last Name:
              <input type="text" name='lname' placeholder='Enter First name' onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
            </label>
            <label htmlFor="age"> Age:
              <input type="text" name='age' placeholder='Enter First name' onChange={(e)=>setAge(e.target.value)} value={age}/>
            </label>
            <span  >
            {
              isUpdate===false?
              <button className='btn btn-primary mx-4 px-2'  onClick={(e)=>handleSave(e)}>Save</button>:
              <button className='btn btn-primary mx-4' onClick={()=>handleUpdate()} >Update</button>    
            }
          
            
            <button className='btn btn-danger mx-1' onClick={()=>handleClear()}>Clear</button>
            </span>
          </div>
        </div>
      <table className='table table-hover table-dark table-bordered '>
      <thead>
      <tr>
        <th>Sr.No</th>
        <th>Id</th>
        <th>First name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {
            data.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>
                    <button className='btn btn-danger'  onClick={()=>handledelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
     </div>
    
    </>
  )
}

export default App
