import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center' style={{width:'100%',height:'100vh',}}>
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
            <img src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' alt='page not found' width={'100%'} height={'450px'} />
            <h1 className='mt-3 text-center' style={{fontWeight:'800'}}>Look like you're lost</h1>
            <h4 className='text-center'>The page you are looking is unavailable</h4>
            <Link to={'/'}><button style={{marginLeft:'200px'}} className='btn btn-success mt-5 mb-5 rounded-0'>Back Home</button></Link>
            </div>
            <div className="col-md-1"></div>
        </div>
        
    </div>
    </>
  )
}

export default PagenotFound