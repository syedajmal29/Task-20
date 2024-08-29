import React from 'react'
import { Link } from 'react-router-dom'


function Homepage() {
  return (
    <div className=' box'>
        <div className='text-center'>
        <h1 className='text-light'>Library Management System</h1>
       <Link to="/author" className='btn btn-primary m-4'>Author</Link>
       <Link to="/book" className='btn btn-danger m-4'>Book</Link>
    </div>
    </div>
  )
}

export default Homepage