import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import { Button } from '../Button/Button';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegistro from '../ModalRegistro/ModalRegistro';

function Navbar(props) {

    const [button, setButton] = useState(true);
    const [modal, setModal] = useState(false);
  
    const showModal = () => setModal(true);
    
    const [userName, setUserName] = useState("");
  
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
      props.userName(childData);
      loginDone()
    }
  
    /*const logout = () => {
      setLogin(false);
      setButton(true);
      props.userName("");
      setUserName("");
    }*/

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                  <Link to="/" className="navbar-logo">
                      <img src="/img/magoGames_logo.png" alt="magogames logo"/>
                  </Link>
                  <div className="navbar-signup">
                    {button && <Button className="navbar-signup" onClick={showModal} buttonStyle='btn--outline'>LOGIN</Button>}
                  </div>
                </div>
            </nav>
            <div>
                {modal && ( <ModalLogin loginCallback={handleLoginCallback} registerCallback={handleRegisterCallback} parentCallback = {handleCallback}/> )}
            </div>
            <div>
                {register && (<ModalRegistro parentCallback = {handleRegisterCallbackClose}/> )}
            </div>
        </>
    )
}

export default Navbar