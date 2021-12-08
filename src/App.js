import './App.css';
import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [name, setName] = useState('')

  function handleNameCallback(childData){
    setName(childData)
  }
  

  return (
    <>
    <Navbar nameCallback = {handleNameCallback} />
    <Switch>
      <Route path='/' exact >
          <Home name = {name} />
       </Route>
    </Switch>
    </>
  );
}

export default App;