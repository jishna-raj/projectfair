import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Context';

function Add() {

  const [projectDetails, setProjectDetails] = useState(
    {
      title: "",
      language: "",
      GitHub: "",
      website: "",
      Overview: "",
      projectImg: ""
    }

  )
  console.log(projectDetails);

  const [preview, setPreview] = useState("")
  const [key, setKey] = useState(false)


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleClose1()
  }
  const handleShow = () => setShow(true);


  const { setAddResponse } = useContext(addResponseContext)

  useEffect(() => {
    if (projectDetails.projectImg) {

      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }

  }

    , [projectDetails.projectImg])


  const handleClose1 = () => {

    setProjectDetails({
      title: "",
      language: "",
      GitHub: "",
      website: "",
      Overview: "",
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


  const handleAdd = async () => {
    const { title, language, GitHub, website, Overview, projectImg } = projectDetails

    if (!title || !language || !GitHub || !website || !Overview || !projectImg) {
      toast.info("please fill the form")
    }
    else {

      //if its an uploaded content it must be shared in the form of form data.
      //formData class is used to sent req with an uploaded content.

      //1) create an object.

      const reqBody = new FormData()

      //2)append() method is used to add data to the object, at a time one data is added

      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("GitHub", GitHub)
      reqBody.append("website", website)
      reqBody.append("Overview", Overview)
      reqBody.append("projectImg", projectImg)

      const token = sessionStorage.getItem("token")

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }


        const result = await addProjectApi(reqBody, reqHeader);
        console.log(result);


        if (result.status == 200) {
          toast.success("Project added successfully")
          setAddResponse(result.data)
          handleClose()

        }

        else {
          toast.error('something went wrong')
          handleClose()
        }

      }



    }
  }

  return (
    <>
      <button className='btn btn-success' onClick={handleShow}>Add Project</button>

      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor='projImg'>
                <input type='file' id='projImg' style={{ display: 'none' }} key={key} onChange={(e) => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} />

                <img src={preview ? preview : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkI3f1KCV8iwas9NLoWM75NYiSE14cY-8xGw&s'} alt='' width={'100%'} height={'350px'} /></label>
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
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored " position="top-center" />
    </>
  )
}

export default Add