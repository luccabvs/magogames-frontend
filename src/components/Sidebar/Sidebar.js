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


    async function favorites(){
      var favorites = await axios.get('https://magogames-backend.herokuapp.com/API/favorite/'+props.name)
      var list = [];
      console.log(favorites)
      for (var i = 0; i < favorites.data.length; i++){
        var favorite = await axios.get('https://magogames-backend.herokuapp.com/externalAPI/dealLookup/'+favorites.data[i].favorite.replaceAll("%", "_"))
        list.push(favorite.data.gameInfo)
        console.log(favorite.data.gameInfo)
      } 
      setListFavorites(list)
    }


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
        <Button variant="primary" onClick={() => {handleShow(); favorites();}}>
          <BsList />
        </Button>
  
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <div className='sair'>
                  <h2>{props.name}</h2>
                  <Button onClick={logout}>Sair</Button>
              </div>
              <div className='favoritos-title'>
                <h1>Seus Favoritos</h1>
              </div>

              <div className='cards'>
                {listFavorites.map((game, index) => (
                  <CardGames className='card' name={props.name} key={index} content = {game} />
                ))}
              </div>              
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  
}

export default Sidebar;