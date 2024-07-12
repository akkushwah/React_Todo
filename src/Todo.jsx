import React, { useEffect, useState } from 'react'

function Todo() {
  //  Get data fromlocal storage
  function getLocalData() {
    let items = localStorage.getItem('tasks');
    if (items) {
      return JSON.parse(localStorage.getItem('tasks'))
    }
    else {
      return [];
    }
  }

  const [tasks, setTasks] = useState(getLocalData())
  const [newtasks, setNewTasks] = useState([""])
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setEditItem] = useState(null)

  function handleInputChange(e) {
    setNewTasks(e.target.value)
  }




  function addTask() {
    if (!newtasks) {
      alert("plz add todo")
    } else if (newtasks && !toggleSubmit) {
      setTasks(tasks.map((elem) => {
        if (elem.id == isEditItem) {
          return { ...elem, name: newtasks };
        }
        return elem;
      })
      )
      setToggleSubmit(true);
      setNewTasks("")
      setEditItem(null)

    }
    else if (!newtasks == "") {
      let addDate = {
        id: new Date().getTime().toString(),
        name: newtasks
      }
      setTasks([...tasks, addDate])
      setNewTasks("")
    }
  }

  function deleteTask(index) {
    let updatedTask = tasks.filter((val) => val.id !== index);
    setTasks(updatedTask)
  }

  function edit(index) {
    let newEdit = tasks.find((elem) => {
      return elem.id == index
    });
    setToggleSubmit(false);
    setNewTasks(newEdit.name)
    setEditItem(index)
  }

  function clear() {
    setTasks([])
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <div className='m-10'>
        <h1 className='text-3xl  font-medium'>To-do App</h1>
        <div className='border p-5 my-5'>
          <input type="text"
            className='border p-2 w-[50%]'
            value={newtasks}
            placeholder='Enter your task..'
            onChange={handleInputChange} />

          {
            toggleSubmit ? (<button
              className='p-2 px-3 bg-green-800 text-white rounded'
              onClick={addTask}>
              Add</button>)
              : (<button
                className='p-2 px-3 bg-green-800 text-white rounded'
                onClick={addTask}>
                Edit</button>)
          }





          <ul className='my-5'>
            {
              tasks.map((val) => {
                return (<>
                  <li key={val.id}
                    className='my-2 p-2 bg-slate-300 justify-between w-[70%] inline-block'
                  >{val.name}
                  </li>
                  <button className='bg-yellow-600 p-2 m-2 rounded'
                    onClick={() => {
                      edit(val.id)
                    }}>Edit</button>
                  <button className='bg-red-500 p-2 rounded'
                    onClick={() => {
                      deleteTask(val.id)
                    }}>delete</button>
                </>
                )
              })
            }
          </ul>

          <button className='bg-red-500 text-white p-2 rounded'
            onClick={clear}>Clear</button>
        </div>
      </div>
    </>
  )
}

export default Todo