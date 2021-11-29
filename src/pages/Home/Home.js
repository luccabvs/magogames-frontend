import Search from "../../components/Search/Search";
import CardGames from "../../components/CardGames/CardGames";
import axios from 'axios';
import './Home.css'

function Home(){

    axios.get("https://www.cheapshark.com/api/1.0/deals?sortBy=title").then((response) => { 
        console.log(response)
    })
    
    return(
        <div>
            <div className="search-form">
                <Search />
            </div>
            <div className="card-group">
                <CardGames />
                <CardGames />
                <CardGames />
                <CardGames />
                <CardGames />
                <CardGames />
                <CardGames />
                <CardGames />
                <CardGames />
            </div>
        </div>
    )
}

export default Home;
