import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isLoginAuthContext } from '../context/Context';




function Header() {

  const navigate = useNavigate()
  const [token, setToken] = useState("")
  const { setIsLoginStatus } = useContext(isLoginAuthContext)


  const handleLogout = () => {

    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsLoginStatus(false)
    navigate('/')


  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);




  return (
    <>


      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand className='text-light'>

            <Link className='text-light' style={{ textDecoration: 'none' }} to={'/'}><h3><FontAwesomeIcon icon={faStackOverflow} style={{ color: "#f2f4f8", marginRight: "20px" }} />Project Fair</h3></Link>
          </Navbar.Brand>
          {token && <button className='btn btn-warning rounded-0' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} style={{ color: "#f7f7f8", }} className='me-2' />Logout</button>}
        </Container>
      </Navbar>

    </>
  )
}

export default Header