import { Button } from '../Button/Button';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import './ModalGamesDetails.css'
import axios from 'axios';

function ModalGamesDetails(props){ 
    const [show, setShow] = useState(true);
    const [store, setStore] = useState();
    const [gameLookup, setGameLookup] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var name = props.name;


    const closeModal = () => {
      props.parentCallback(false)
      handleClose()
    }

    useState(() => {
      axios.get('http://localhost:8000/externalAPI/store').then((response) => {
        setStore(response.data)
      })
    }, [])

    function getStore(storeId){
      var newStore;
      for (var i = 0; i < store.length; i++ ){
        if (storeId == store[i].storeID){
          newStore = store[i].storeName
        }
      }
      return newStore
    }

    function gameDetails(id){
      axios.get('http://localhost:8000/externalAPI/gameLookup/'+id).then((response) => {
        setGameLookup(response.data)
      })
    }

    function postFavorite(){
      var body = {
        'user' : name,
        'favorite' : props.content.dealID
      }
      axios.post('http://localhost:8000/API/favorite', body).then((response) => {
        console.log(response)
      })
    }

    return (
      <>
        <Modal show={show} onHide={closeModal} onClick={gameDetails(props.content.gameID)}>
          <Modal.Header closeButton/>
          <Modal.Body className="popup" >
            <Button variant="secondary" onClick={postFavorite}>
              Favoritar
            </Button>
            <img src={props.content.thumb} />
            <ul>
              <li>Nome: {props.content.title}</li>
              <li>Preço médio: {props.content.normalPrice}</li>
              <li>Preço: {props.content.salePrice}</li>
              {store && <li>Loja: {getStore(props.content.storeID)}</li>}
              {gameLookup && <li>Menor preço atingido: {gameLookup.cheapestPriceEver.price}</li>}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}


export default ModalGamesDetails;