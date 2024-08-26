import { faFacebook, faInstagram, faStackOverflow, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import { Link } from 'react-router-dom'




function Footer() {
  return (
    <>
    <div className='container-fluid bg-success p-3'>
      <div className="row">
        <div className="col-md-4">
          <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} />Project Fair</h3>
          <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est in doloribus vero dolores iste consectetur maiores quos quidem voluptate consequatur quae sequi cupiditate minus asperiores ab aliquam nihil, at qui.</p>
        </div>
        <div className="col-md-2  d-flex justify-content-center align-items-center flex-column" >
          <h4 className='text-light'>Links</h4>
          <Link to={'/'} className='text-decoration-none '><p className='mt-3'>Home</p></Link>
          <Link to={'/project'} className='text-decoration-none '><p >Project</p></Link>
          <Link to ={'/dashboard'} className='text-decoration-none '><p >DashBoard</p></Link>
          
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center flex-column">
          <h4 className='text-light'>Guides</h4>
          <p className='mt-3'>React</p>
          <p>Bootstrap</p>
          <p>Bootswatch</p>
        </div>
        <div className="col-md-4">
          <h4 className='text-light'>Contact Us</h4>
          <div className='d-flex mt-3'>
            <input type='text' placeholder='Email id' className='form-control rounded-0'/>
            <button className='btn btn-warning rounded-0'> Subscribe</button>
          </div>
          <div className='d-flex justify-content-between text-light mt-4'>
          <FontAwesomeIcon icon={faFacebook} size="2xl" />
          <FontAwesomeIcon icon={faInstagram} size="2xl" />
          <FontAwesomeIcon icon={faTwitter} size="2xl" />
          <FontAwesomeIcon icon={faWhatsapp} size="2xl" />


          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer