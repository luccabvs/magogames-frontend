import { Button } from '../Button/Button';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

function ModalRegistro(props){
    const [button, setButton] = useState(true);

    const [show, setShow] = useState(true);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordIsDifferent, setPasswordIsDifferent] = useState(false);
    const [nameExists, setNameExists] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onTrigger = (event) => {
        props.parentCallback(false);
    }

    const closeModal = () => {
        onTrigger()
        handleClose()
    }
    
    var body = { 
        'username': name, 
        'email': email, 
        'password': password
    }
        

    const createUser = () => {
        if (password != confirmPassword){
            setPasswordIsDifferent(true);
        } else {
            setPasswordIsDifferent(false);
            setNameExists(false)
            axios.post('http://localhost:8000/API/register/', body).then((response) => {
                closeModal()
            }).catch((error) => {
                setNameExists(true)
                console.log(error)
            }
        )}
    }
    

    return(
        <>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                <img className="modal-title" src="/img/magoGames.png"/>
                </Modal.Header>
                <Modal.Body>
                <form className="form-login">
                    <input className="input" placeholder="Usuário" type="text" onInput={e => setName(e.target.value)}></input>
                    <input className="input" placeholder="Email" type="text" onInput={e => setEmail(e.target.value)}></input>
                    <input className="input" placeholder="Senha" type="password" onInput={e => setPassword(e.target.value)}></input>
                    <input className="input" placeholder="Confirmar senha" type="password" onInput={e => setConfirmPassword(e.target.value)}></input>                    
                    <div className="senhaDiferente">
                        {passwordIsDifferent && <h6>A senha é diferente</h6>}
                        {nameExists && <h6>Esse nome já existe</h6>}
                    </div>

                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Fechar
                </Button>
                    {button && <Button onClick={createUser} className="" buttonStyle='btn--outline'>Registrar</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalRegistro;