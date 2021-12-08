import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap'
import ModalGamesDetails from '../../components/ModalGamesDetails/ModalGamesDetails'
import "./CardGames.css"

function CardGames(props) {
    const sampleStyle = {
        minWidth: "20%",
        flexGrow: 0
    };

    var name = props.name;

    const [modalGamesDetails, setModalGamesDetails] = useState(false);
    
    const showModalGamesDetails = () => setModalGamesDetails(true);

    const handleModalGamesDetailsCallback = (childData) =>{
        setModalGamesDetails(childData)
    }

    return(
        <>
            <Card className='card' style={{ width: '18rem' }}>
                <Card.Img className='img' variant="top" src={props.content.thumb}/>
                <Card.Body>
                    <Card.Title>{props.content.title}</Card.Title>
                    <div className='price-button'>
                        <h4>$ {props.content.salePrice}</h4>
                        <Button className='botao-ver-mais' variant="primary" onClick={showModalGamesDetails}>Ver mais</Button>
                    </div>
                </Card.Body>
            </Card>
            {modalGamesDetails && (<ModalGamesDetails name = {name} content={props.content} parentCallback = {handleModalGamesDetailsCallback}/> )}
        </>
    )

}

export default CardGames;