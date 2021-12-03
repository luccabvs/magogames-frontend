import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { BsSliders } from "react-icons/bs";
import { Dropdown } from 'react-bootstrap';
import './Filter.css'
import axios from 'axios';

function Filter(props){

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    function handleSubmit(event){
        props.filterMaxCallback(maxPrice)
        props.filterMinCallback(minPrice)
        event.preventDefault();
    }
    
    function handleMinPriceChange(event){
        setMinPrice(event.target.value);
    }
    
    function handleMaxPriceChange(event){
        setMaxPrice(event.target.value);
    }

    return(
        <Dropdown>
            <Dropdown.Toggle>
                <BsSliders />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <form onSubmit={handleSubmit}>
                    <label className='filtro-label'>Mín</label>
                    <input className='filtro-input' label='Máximo' type='text' placeholder='U$'onChange={handleMinPriceChange} />
                    <label className='filtro-label'>Máx</label>
                    <input className='filtro-input' label='Máximo' type='text' placeholder='U$' onChange={handleMaxPriceChange} />
                    <Button type='submit' className='btn-filtrar'>Filtrar</Button>
                </form>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Filter;