import React, { useState } from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './Search.css';
import axios from 'axios';
import { BsBoxArrowInRight } from "react-icons/bs";
import Filter from "../../components/Filter/Filter";


const Search = (props) => {

  const [searchValue, setSearchValue] = useState({value:''});
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  function handleChange(event){
    setSearchValue({value: event.target.value});
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(minPrice)
    console.log(maxPrice)

    console.log(searchValue.value);
    let url = 'http://localhost:8000/externalAPI/search/'
    if (searchValue.value != ''){
      if (minPrice != '' && maxPrice !=''){
        url += searchValue.value+'/'+minPrice.toString()+'/'+maxPrice.toString()
      }
      else if (minPrice != ''){
        url += 'min/'+searchValue.value+'/'+minPrice.toString()
      }
      else if (maxPrice != ''){
        url += 'max/'+searchValue.value+'/'+maxPrice.toString()
      }

      else{
        url += searchValue.value
      }
    }
    else{
      if (minPrice != '' && maxPrice != ''){
        url += minPrice.toString()+'/'+maxPrice.toString()
      }
      else if (minPrice != ''){
        url += 'min/'+minPrice.toString()
      }
      else if (maxPrice != ''){
        url += 'max/'+maxPrice.toString()
      }
    }
    console.log(url)
    axios.get(url)
        .then((response) => { 
          props.searchCallback(response.data)
        })

  }

  const handleFilterMinCallback = (childData) => {
    setMinPrice(childData);
  }

  const handleFilterMaxCallback = (childData) => {
    setMaxPrice(childData);
  }

  return (
    <>
      <MDBCol md="6" className="search-left">
        <form className="form-inline mt-4 mb-4" onSubmit={handleSubmit}>
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" onChange={handleChange}/>
          <button type="submit" className="enter-button"><BsBoxArrowInRight /></button>
        </form>
      </MDBCol>
      <Filter filterMaxCallback = {handleFilterMaxCallback} filterMinCallback = {handleFilterMinCallback}/>
    </>
  );
}

export default Search;