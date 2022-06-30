import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

const Header = ({logoutUser, setLogoutUser}) => {
  const [login, setLogin] = useState("");

  useEffect(() => {
    hydrateStateWithLocalStorage();
  }, [logoutUser])

  const logout = () => {
    localStorage.removeItem("Login");
    setLogoutUser(true);
  }


  const hydrateStateWithLocalStorage = () => {
    if(localStorage.hasOwnProperty("Login")){
      let value = localStorage.getItem("Login");
      try{
        value = JSON.parse(value);
        setLogin(value);
      } catch(e){
        setLogin("")
      }
    }
  }
  return (
    <div style={{marginTop: "20px"}}>
      {!logoutUser && login && login.userLogin ? (
        <Button style={{width: "100px"}} variant="contained" color="secondary" onClick={logout}>Log out</Button>):
        (<Link to="/login">
          <Button style={{width: "100px"}} variant="contained" color="secondary">Login</Button>
        </Link>)
      }
    </div>
  )
}

export default Header
