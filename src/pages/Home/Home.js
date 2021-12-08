import React, { useState, useEffect } from 'react';
import Search from "../../components/Search/Search";
import CardGames from "../../components/CardGames/CardGames";
import axios from 'axios';
import './Home.css'


function Home(props){
    const [testeApi, setTesteApi] = useState([]);
    const [searchGames, setSearchGames] = useState();
    
    var name = props.name;

    useEffect(() => {
        axios.get('http://localhost:8000/externalAPI/home')
        .then((response) => { 
            setTesteApi(response.data)
        })
    }, [])

    const handleSearchCallback = (childData) => {
        setTesteApi(childData);
    }

    
    return(
        <div>
            <div className="search-form">
                <Search searchCallback = {handleSearchCallback}/>
            </div>
            <div className="card-group">             
                {testeApi.map((game, index) => (
                    <CardGames name={name} key={index} content = {game} />                    
                ))}
            </div>
        </div>
    )
}

export default Home;