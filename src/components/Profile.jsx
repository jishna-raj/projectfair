import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Collapse from 'react-bootstrap/Collapse';
import React, { useEffect, useState } from 'react';
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
  });

  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [updateStatus, setUpdateStatus] = useState({});

  const handleUpdate = async () => {
    const { username, email, password, github, linkedin, profile } = userDetails;

    if (!github || !linkedin) {
      toast.info("Please fill the form completely");
    } 
    
    else {


      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);
      reqBody.append('profile', preview ? profile : existingImage);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        };

        const result = await profileUpdateApi(reqBody, reqHeader);

        if (result.status === 200) {
          toast.success("Profile Updated Successfully");
          sessionStorage.setItem("existingUser", JSON.stringify(result.data));
          setUpdateStatus(result.data);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('existingUser')) {
      const user = JSON.parse(sessionStorage.getItem('existingUser'));
      setUserDetails({
        ...userDetails,
        username: user.username,
        email: user.email,
        password: user.password,
        github: user.github,
        linkedin: user.linkedin
      });
      setExistingImage(user.profile);
    }
  }, [updateStatus]);

  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile));
    }
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [userDetails.profile]);

  return (
    <>
      <div className='shadow p-3 mb-5'>
        <div className='d-flex mt-3'>
          <h4>Profile</h4>
          <div className='ms-auto'>
            <button onClick={() => setOpen(!open)} className='btn btn-outline-success'>
              {open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
            </button>
          </div>
        </div>

        <Collapse in={open}>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <label htmlFor='pdImg'>
                <input type='file' id='pdImg' style={{ display: 'none' }} onChange={(e) => setUserDetails({ ...userDetails, profile: e.target.files[0] })} />
                <img
                  src={preview || existingImage ? `${serverUrl}/uploads/${existingImage}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooCX-nPSHN0kCVdUnm-eptCPvUF04YaxeHQ&s'}
                  alt='Profile'
                  width='250px'
                  height='250px'
                  style={{ borderRadius: '50%' }}
                />
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
  );
}

export default Profile;
