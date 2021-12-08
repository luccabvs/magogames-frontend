import React, { useState, useEffect } from 'react';
import './Sidebar.css'
import { Button, Offcanvas } from 'react-bootstrap';
import { BsList } from "react-icons/bs";
import CardGames from "../../components/CardGames/CardGames";
import axios from 'axios';

function Sidebar(props){ 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [listFavorites, setListFavorites] = useState([]);


    /*useEffect(() => {
        axios.get('https://magogames-backend.herokuapp.com/API/favorite/'+props.name)
        .then((response) => {
            var list = [];
            for (var i = 0; i < response.data.length; i++){
                axios.get('https://magogames-backend.herokuapp.com/externalAPI/dealLookup/'+response.data[i].favorite.replaceAll("%", "_"))
                .then((response) => {
                    list.push(response.data)
                })
            }
            setListFavorites(list);
        })
    }, [listFavorites])*/


    const logout = () => {
        axios.post('https://magogames-backend.herokuapp.com/API/logout/', null, {
            headers: {
                Authorization: 'Token ' + props.token
            }
        }).then((response) => {
            props.loginSidebarCallback(false);
            props.buttonSidebarCallback(true);
            props.nameSidebarCallback("");
        }).catch((error) => {
            console.log(error)
        }
    )}

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          <BsList />
        </Button>
  
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <div className='sair'>
                  <h1>{props.name}</h1>
                  <Button onClick={logout}>Sair</Button>
              </div>
              {listFavorites.map((game, index) => (
                <CardGames name={props.name} key={index} content = {game} />
              ))}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  
}

export default Sidebar;