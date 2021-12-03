import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap'
import ModalGamesDetails from '../../components/ModalGamesDetails/ModalGamesDetails'
import "./CardGames.css"

function CardGames(props) {
    const sampleStyle = {
        minWidth: "20%",
        flexGrow: 0
    };

    const [modalGamesDetails, setModalGamesDetails] = useState(false);
    
    const showModalGamesDetails = () => setModalGamesDetails(true);

    const handleModalGamesDetailsCallback = (childData) =>{
        setModalGamesDetails(childData)
    }
    return(
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img className='img' variant="top" src={props.content.thumb}/>
                <Card.Body>
                    <Card.Title>{props.content.title}</Card.Title>
                    <Button className='botao-ver-mais' variant="primary" onClick={showModalGamesDetails}>Ver mais</Button>
                </Card.Body>
            </Card>
            {modalGamesDetails && (<ModalGamesDetails content={props.content} parentCallback = {handleModalGamesDetailsCallback}/> )}
        </>
    )

}

export default CardGames;