import { Button } from '../Button/Button';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import './ModalLogin.css'

function ModalLogin(props){ 
    const [button, setButton] = useState(true);

    const [show, setShow] = useState(true);
    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onTrigger = (event) => {
        props.parentCallback(false);
    }

    const onTriggerRegister = (event) => {
        props.parentCallback(false);
        props.registerCallback(true);
    }

    const closeModal = () => {
        onTrigger()
        handleClose()
    }

    const openRegister = () => {
        onTriggerRegister()
        handleClose()
    }

    
    /*const login = () => {
        backend.get('/user/'+name).then((response) => {
            if(response.data.password == password){
                setWrongPassword(false)
                props.loginCallback(name)
                onTrigger()
                handleClose()
            } else {
                setWrongPassword(true)
            }
        }).catch((error) => {
            console.log(error)
        }
    )}*/


    return(
        <>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                <img className="modal-title" src="/img/magoGames.png"/>
                </Modal.Header>
                <Modal.Body>
                <form className="form-login">
                    <input className="input" placeholder="Usuário" type="text" onInput={e => setName(e.target.value)}></input>
                    <input className="input" placeholder="Senha" type="password" onInput={e => setPassword(e.target.value)}></input>
                    <div className="senhaDiferente">
                        {wrongPassword && <h9>Senha incorreta</h9>}
                    </div>
                    <div className="input">Não tem conta?   
                        <span> </span>

                        <Link onClick={openRegister} to='/'>
                            Registre-se 
                        </Link>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Fechar
                </Button>
                <Link to="/">
                    {button && <Button className="" buttonStyle='btn--outline'>Entrar</Button>}
                </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLogin;