import { Button } from '../Button/Button';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

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

    var body = { 
        'username': name, 
        'password': password
    }

    const login = () => {
        axios.post('https://magogames-backend.herokuapp.com/API/login/', body).then((response) => {
            if (response.data.token !== undefined){
                setWrongPassword(false)
                props.loginCallback(name)
                props.tokenCallback(response.data.token)
                onTrigger()
                handleClose()
            } else {
                setWrongPassword(true)
            }
        }).catch((error) => {
            console.log(error)
        }
    )}


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
                    {button && <Button onClick={login} className="" buttonStyle='btn--outline'>Entrar</Button>}
                </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLogin;