import React from 'react'
import { createContext, useState } from 'react'



export const addResponseContext = createContext({})  //here we pass an empty object in initial state because  is an object we passing through the all project

export const editResponseContext = createContext({})

export const isLoginAuthContext = createContext(true)


function Context({ children }) {

  const [addResponse, setAddResponse] = useState({})

  const [editResponse, setEditResponse] = useState({})

  const [isLoginStatus, setIsLoginStatus] = useState(true)
  return (
    <>
      <addResponseContext.Provider value={{ addResponse, setAddResponse }}> {/* provider tag is used to share that data. where shared data should be passed as key value pairs */}
        <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
          <isLoginAuthContext.Provider value={{ isLoginStatus, setIsLoginStatus }}>
            {children}
          </isLoginAuthContext.Provider>
        </editResponseContext.Provider>
      </addResponseContext.Provider>

    </>
  )
}

export default Context