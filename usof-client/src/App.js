import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { NavbarContext } from './components/context';
// import { AuthContext } from './components/context';
import Navbar from './components/UI/Navbar/Navbar';
import './styles/app.css'
import { IsAuthCheck } from './utils/IsAuthCheck';


function App() {
  // const[navbarLinks, setNavbarLinks] = useState({
  //   name: "FORUM JAB", 
  //   links: [
  //       {name: "login", page: "/login"},
  //       {name: "register", page: "/register"},
  //   ]
  // });
  return (
    // <NavbarContext.Provider value={{
    //   navbarLinks: navbarLinks,
    //   setNavbarLinks: setNavbarLinks
    // }}>
      <BrowserRouter>
        <Navbar />
        {IsAuthCheck()}
        <AppRouter />
      </BrowserRouter>
    // </NavbarContext.Provider>
  )
}

export default App;
