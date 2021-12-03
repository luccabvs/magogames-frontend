import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap'
import { BsSliders } from "react-icons/bs";
import { Dropdown } from 'react-bootstrap';
import './Filter.css'
import axios from 'axios';

function Filter(props){

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const min = useRef('');
    const max = useRef('');
    const price = useRef('');

    useEffect(() => { min.current = minPrice; price.current = {'minPrice': min.current, 'maxPrice': max.current}}, [minPrice])
    useEffect(() => { max.current = maxPrice; price.current = {'minPrice': min.current, 'maxPrice': max.current} }, [maxPrice])

    function handleSubmit(event){
        props.filterCallback(price.current)
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
                    <input className='filtro-input' label='Máximo' type='text' placeholder='U$'onInput={handleMinPriceChange} />
                    <label className='filtro-label'>Máx</label>
                    <input className='filtro-input' label='Máximo' type='text' placeholder='U$' onInput={handleMaxPriceChange} />
                    <Button type='submit' className='btn-filtrar'>Filtrar</Button>
                </form>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Filter;