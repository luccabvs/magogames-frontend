import React, { useState, useEffect } from 'react';
import Search from "../../components/Search/Search";
import CardGames from "../../components/CardGames/CardGames";
import axios from 'axios';
import './Home.css'

function Home(){
    const [testeApi, setTesteApi] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/externalAPI/home')
        .then((response) => { 
            setTesteApi(response.data)
        })
    }, [])

    
    return(
        <div>
            <div className="search-form">
                <Search />
            </div>
            <div className="card-group">
                {testeApi.map(game => (
                    <CardGames content = {game} />
                ))}
            </div>
        </div>
    )
}

export default Home;