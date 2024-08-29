import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import Homepage from './Homepage'
import Author from './Author'
import Book from './Book'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {

  
  return (
    <>
    <div className="main-container">
  
   <BrowserRouter>
   <Routes>
   <Route path='/' element={  <Homepage />}/>
    <Route path='/author' element={  <Author />}/>
<Route path='/book' element={<Book />} />
   </Routes>
   </BrowserRouter>
   </div>
 
    </>
  )
}

export default App