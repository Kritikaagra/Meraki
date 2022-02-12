import React, { useState, useEffect } from 'react'
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'
import Login from './Component/Login/Login';
import SignIn from './Component/SignIn/SignIn';
import Homepage from './Container/Homepage/Homepage';
import JobSection from './Container/JobSection/JobSection';
import Profile from './Container/Profile/Profile';

function App() {
  document.title = "MERAKI";
  return (
    <> 
    <BrowserRouter>
        <Switch>
        <Route path="/" exact component={()=><Login/>}/>
        <Route path="/signIn" exact component={()=><SignIn/>}/>
        <Route path="/homepage" exact component={()=><Homepage/>}/>
        <Route path="/jobSection" exact component={()=><JobSection/>}/>
        <Route path="/profile" exact component={()=><Profile/>}/>
          
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App
