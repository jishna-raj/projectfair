
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Context';

function EditProject({ project }) {

  const [key, setKey] = useState(false)
  const [preview, setPreview] = useState ("")

  const [projectDetails, setProjectDetails] = useState(

    {
      title: project.title,
      language: project.language,
      GitHub: project.GitHub,
      website: project.website,
      Overview: project.Overview,
      projectImg: ""
    }
  )

  const [show, setShow] = useState(false);


  const {setEditResponse} = useContext(editResponseContext)

 

  const handleClose = () => {
    setShow(false);
    handleClose1()
  }

  const handleShow = () => setShow(true);

  const handleClose1 = () => {

    setProjectDetails({
      title: project.title,
      language: project.language,
      GitHub: project.GitHub,
      website: project.website,
      Overview: project.Overview,
      projectImg: ""
    })


    setPreview("")

    if (key == false) {
      setKey(true)
    }
    else {
      setKey(false)
    }
  }


  const handleEdit = async () => {

    const { title, language, GitHub, website, Overview, projectImg } = projectDetails

    if (!title || !language || !GitHub || !website || !Overview) {
      toast.info('Please fill the form completely')
    }

    else {
      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("GitHub", GitHub)
      reqBody.append("website", website)
      reqBody.append("Overview", Overview)
      preview ? reqBody.append("projectImg", projectImg) : reqBody.append("projectImg", project.projectImage)

      const token = sessionStorage.getItem("token")

      if (token) {
        if (preview) {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }

          const result = await editUserProjectApi(project._id, reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Edited Successfully")
            setEditResponse(result.data)
            handleClose()
          }
          else {
            toast.error("something went wrong")
            handleClose()
          }

        }
        else {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
          const result = await editUserProjectApi(project._id, reqBody, reqHeader)
          console.log(result);


          if (result.status == 200) {
            toast.success("Edited Successfully")
            setEditResponse(result.data)
            handleClose()
            set
          }
          else {
            toast.error("something went wrong")
            handleClose()
          }
        }

      }
    }
  }





  useEffect(() => {
    if (projectDetails.projectImg) {

      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }

  }

    , [projectDetails.projectImg])

  console.log(projectDetails);



  return (
    <>

      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#a02bee", }} onClick={handleShow} />
      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor='projImg'>
                <input type='file' id='projImg' style={{ display: 'none' }} key={key}  onChange={(e)=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} />

                <img src={preview ? preview : `${serverUrl}/uploads/${project?.projectImage}`}  alt='' width={'100%'} height={'350px'}  /></label>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input type='text' placeholder='title' className='form-control' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type='text' placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type='text' placeholder='GitHub' className='form-control' value={projectDetails.GitHub} onChange={(e) => setProjectDetails({ ...projectDetails, GitHub: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type='text' placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </div>
              <div className="mb-3">
                <textarea rows={5} placeholder='Overview' className='form-control' value={projectDetails.Overview} onChange={(e) => setProjectDetails({ ...projectDetails, Overview: e.target.value })}></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored " position="top-center" />
    </>
  )
}

export default EditProject