import React, { useState, useEffect } from 'react'
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'
import Login from './Component/Login/Login';
import SignIn from './Component/SignIn/SignIn';

function App() {
  document.title = "MERAKI";
  return (
    <> 
    <BrowserRouter>
        <Switch>
        <Route path="/" exact component={()=><Login/>}/>
        <Route path="/signIn" exact component={()=><SignIn/>}/>
          
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App
