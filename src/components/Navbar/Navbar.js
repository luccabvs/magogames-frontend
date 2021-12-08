import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import { Button } from '../Button/Button';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegistro from '../ModalRegistro/ModalRegistro';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";

function Navbar(props) {

    const [button, setButton] = useState(true);
    const [modal, setModal] = useState(false);
  
    const showModal = () => setModal(true);
    
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState("");

    const [login, setLogin] = useState(false);
    const loginDone = () => {
      setLogin(true);
      setButton(false);
    }
  
    const [register, setRegister] = useState(false);
  
    const handleCallback = (childData) =>{
      setModal(childData)
      setRegister(childData)
    }
    
    const handleRegisterCallback = (childData) =>{
      setRegister(childData)
    }
  
    const handleRegisterCallbackClose = (childData) =>{
      setRegister(childData)
    }
    
    const handleLoginCallback = (childData) =>{
      setUserName(childData)
      props.nameCallback(childData);
      loginDone()
    }

    const handleTokenCallback = (childData) =>{
      setToken(childData)
    }
    
    const handleLoginSidebarCallback = (childData) =>{
      setLogin(childData)
    }
    
    const handleButtonSidebarCallback = (childData) =>{
      setButton(childData)
    }
    
    const handleNameSidebarCallback = (childData) =>{
      setUserName(childData)
    }



  
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                  <Link to="/" className="navbar-logo">
                      <img src="/img/magoGames_logo.png" alt="magogames logo"/>
                  </Link>
                  <div>
                    <div className="navbar-signup">
                      {button && <Button className="navbar-signup" onClick={showModal} buttonStyle='btn--outline'>LOGIN</Button>}
                    </div>
                    <div className='buttons'>
                      <div className="navbar-signup">
                        {login &&
                          <Sidebar token={token} loginSidebarCallback={handleLoginSidebarCallback} buttonSidebarCallback={handleButtonSidebarCallback} nameSidebarCallback={handleNameSidebarCallback} name={userName} /> 
                        }
                      </div>
                    </div>
                  </div>
                </div>
            </nav>
            <div>
                {modal && ( <ModalLogin loginCallback={handleLoginCallback} registerCallback={handleRegisterCallback} parentCallback={handleCallback} tokenCallback={handleTokenCallback} /> )}
            </div>
            <div>
                {register && (<ModalRegistro parentCallback = {handleRegisterCallbackClose}/> )}
            </div>
        </>
    )
}

export default Navbar