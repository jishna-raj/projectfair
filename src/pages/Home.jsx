
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import title from '../assets/title.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../services/allApi'

function Home() {

  const [token,setToken] = useState("")
  const [homeProject,setHomeProject] = useState([])


  const getHomeProject = async() =>{
    const result = await homeProjectApi()
    setHomeProject(result.data);
    
  }
  console.log(homeProject);
  


  useEffect(()=>{
    if (setToken(sessionStorage.getItem('token'))){

    }
    getHomeProject()
    
  },[])
  return (
    <>
      <div
        className="container-fluid bg-success  p-4 mb-4"
        style= {{ width: "100%", height: "100vh" }}
      >
        <Row className="mt-5 w-100">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <div>
              <h1 className="text-light" style={{ fontSize: "76px" }}>
                Project Fair
              </h1>
              <h6>
                One stop destination for all software development Projects
              </h6>
              {!token? <Link to={'/login'}>
                <button className="btn btn-outline-light my-4">
                  Get started
                  <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </button>
              </Link>:
              <Link to={'/dashboard'}>
                <button className="btn btn-outline-light my-4">
                  Manage Project
                  <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </button>
              </Link>}
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center flex-column mt-3"
          >
            <img src={title} alt="noimage" width={"60%"} />
          </Col>
        </Row>
      </div>
      <div className="container-fluid">
        <h1 className="text-center my-5">Explore our Projects</h1>
        {homeProject?.length>0?<div className="row mb-5">
          
          {homeProject?.map((item)=>(<div className="col-md-4 justify-content-center d-flex p-4">
            <ProjectCard project = {item} />
          </div>))}
        </div>:null}
        <Link to={"/project"} className="text-primary" style={{ textDecoration: "none" }}>
          <h5 className="text-center my-5 " style={{fontWeight:'700'}}>See more Project</h5>
        </Link>
      </div>
    </>
  )
}

export default Home
