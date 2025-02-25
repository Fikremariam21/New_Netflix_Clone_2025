import { useState } from 'react'

import './App.css'
import Home from './Pages/Home/Home.jsx'
import {Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
 

function App() {

  return (
    <>
       <div className='App'>
        <Routes> 
          <Route path='/' element={<Login/>} />
          <Route path='Home' element={<Home/>} />
          
        </Routes>   
       </div>
      
    </>
  )
}

export default App
