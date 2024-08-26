import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/allApi";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { isLoginAuthContext } from "../context/Context";

function Auth({ register }) {

  const navigate = useNavigate()

  const{setIsLoginStatus} = useContext(isLoginAuthContext)

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    const {username,email,password} = userDetails

    if(!username || !email || !password){
      toast.info("please fill the fields completely")
    }

    else{
      const result = await registerApi(userDetails);
    console.log(result);

    if(result.status == 200){
      toast.success("Registration Successfull")
      setuserDetails({
        username:"",
        email:"",
        password:""
      })

      navigate("/login")
    }

    else{
      toast.error("something went wrong")
      setuserDetails({
        username:"",email:"",password:"",
      })
    }
    }
    
  };

  const handleLogin = async (e) => {

    e.preventDefault()

    const {email,password} = userDetails

    const result = await loginApi(userDetails)
    console.log(result);

    if(result.status == 200){
      
      toast.success("login successfully")
      setuserDetails({
        username:"",
        email:"",
        password:"",
      })

      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))

      sessionStorage.setItem("token", (result.data.token))

      setIsLoginStatus(true)

      navigate('/')
    }

    else{
      toast.error("something went wrong")
      setuserDetails({
        username:"",
        email:"",
        password:""
      })
    }
    
    
  }
  

  console.log(userDetails);

  return (
    <>
      <div
        className="w-100  d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="container w-75">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <h4 className="text-warning">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back Home
            </h4>
          </Link>
          <div className="bg-success p-3">
            <Row>
              <Col
                md={6}
                className="p-4 d-flex justify-content-center align-items-center"
              >
                <img
                  src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif"
                  alt=""
                  width={"60%"}
                />
              </Col>
              <Col
                md={6}
                className="p-5 d-flex justify-content-center text-light"
              >
                <form className="w-100">
                  <h3 className="text-center text-light">
                    <FontAwesomeIcon
                      icon={faStackOverflow}
                      className="me-2 fa-2x"
                    />
                    Project Fair
                  </h3>
                  {register ? (
                    <h5 className="text-center mb-3">
                      Sign Up to your Account
                    </h5>
                  ) : (
                    <h5 className="text-center mb-3">
                      Sign In to your Account
                    </h5>
                  )}
                  {register && (
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-control rounded-0" value={userDetails.username}
                        onChange={(e) =>
                          setuserDetails({
                            ...userDetails,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Email ID"
                      className="form-control rounded-0" value={userDetails.email}
                      onChange={(e) =>
                        setuserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control rounded-0"
                      value={userDetails.password}
                      onChange={(e) =>
                        setuserDetails({
                          ...userDetails,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    {register ? (
                      <div>
                        <button type="button"
                          className="btn btn-warning w-100 rounded-0"
                          onClick={(e) => handleRegister(e)}
                        >
                          Register
                        </button>
                        <p className="pt-3">
                          Already a User? Click here to{" "}
                          <Link
                            to={"/login"}
                            className="text-warning"
                            style={{ textDecoration: "none" }}
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <button className="btn btn-warning w-100 rounded-0" type="button" onClick={handleLogin}>
                          Login
                        </button>
                        <p className="pt-3">
                          New User? Click Here to{" "}
                          <Link
                            to={"/register"}
                            className="text-warning"
                            style={{ textDecoration: "none" }}
                          >
                            Register
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <ToastContainer autoClose = {2000} theme = "colored " position="top-center"/>
    </>
  );
}

export default Auth;