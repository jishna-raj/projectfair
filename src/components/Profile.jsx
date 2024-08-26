import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Collapse from 'react-bootstrap/Collapse';
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { profileUpdateApi } from '../services/allApi';


function Profile() {

  const [open, setOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: ""
  })


  const [preview, setPreview] = useState("")
  const [existingImage, setExistingImage] = useState("")
  const [updateStatus, setUpdateStatus] = useState({})


  const handleUpdate = async () => {

    const { username, email, password, github, linkedin, profile } = userDetails

    if (!github || !linkedin) {
      toast.info("Please fill the form completely")
    }
    else {

      const reqBody = new FormData()

      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append('profile', profile) : reqBody.append('profile', existingImage)



      const token = sessionStorage.getItem("token")
      if (token) {
        if (preview) {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }

          const result = await profileUpdateApi(reqBody, reqHeader)

          console.log(result);

          if (result.status == 200) {
            toast.success("Profile Updated Successfully")
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUpdateStatus(result.data)
          }
          else {
            toast.error("something went wrong")
          }
        }
        else {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
          const result = await profileUpdateApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Profile Updated Successfully")
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUpdateStatus(result.data)
          }
          else {
            toast.error("something went wrong")
          }
        }

      }
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem('existingUser')) {
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setUserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setExistingImage(user.profile)
    }

  }, [updateStatus])


  useEffect(() => {

    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  }, [userDetails.profile])


  console.log(preview);


  console.log(userDetails);





  return (
    <>
      <div className='shadow p-3 mb-5'>
        <div className='d-flex mt-3'>
          <h4>Profile</h4>
          <div className='ms-auto'>
            <button onClick={() => setOpen(!open)} className='btn btn-outline-success'>
              {open ?
                <FontAwesomeIcon icon={faAngleUp} />
                :
                <FontAwesomeIcon icon={faAngleDown} />}
            </button>
          </div>

        </div>


        <Collapse in={open}>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <label htmlFor='pdImg'>

                <input type='file' id='pdImg' style={{ display: 'none' }} onChange={(e) => setUserDetails({ ...userDetails, profile: e.target.files[0] })} />
                {existingImage == "" ? <img src={preview ? preview : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooCX-nPSHN0kCVdUnm-eptCPvUF04YaxeHQ&s'} alt='' width={'150px'} height={'150px'} style={{ borderRadius: '50%' }} /> : <img src={preview ? preview : `${serverUrl}/uploads/${existingImage}}`} alt='' width={'250px'} height={'250px'} style={{ borderRadius: '50%' }} />}
              </label>
            </div>

            <div className="mb-3 mt-5">
              <input type='text' placeholder='GitHub' className='form-control' value={userDetails.github} onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type='text' placeholder='Linkedin' className='form-control' value={userDetails.linkedin} onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} />
            </div>
            <div className="mb-3">
              <button className='btn btn-success' onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </Collapse>

      </div>

      <ToastContainer autoClose={2000} theme="colored " position="top-center" />
    </>
  )
}

export default Profile