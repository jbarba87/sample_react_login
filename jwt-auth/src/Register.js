import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiox from 'axios';

import {useNavigate, Link} from "react-router-dom";

const useStyles = makeStyles( (theme) => ({
  root: {
    '& > *':{
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

const Register = ({setLogoutUser}) => {
  const classes = useStyles();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  let history = useNavigate();

  const register = (e) => {
    console.log("aqui")
    e.preventDefault();
    axiox.post("http://localhost:5000/api/auth/register", {
      email, 
      password
    }).then( (response) => {
      console.log("response")
      localStorage.setItem(
        "Login", 
        JSON.stringify({
          userLogin: true,
          token: response.data.access_token,
        })
      );
      setError("");
      setEmail("");
      setPassword("");
      setLogoutUser(false)
      history("/")
     }).catch((error) => setError(error.response.data.message));
// }).catch((error) => console.log(error));

  }

  return (
    <div style={{ marginTop: "100px"}}>
      <h2>Register Page</h2>
  {error && <p style={{color: "red"}}>{error}</p>}
      <form className={classes.root} noValidate autoComplete="off" onSubmit={register}>
        <TextField id="username" label="Username" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <br/>
        <TextField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <br/>
        <Button style={{width: "100px"}} variant="contained" color="primary" type="submit">Register</Button>
      </form>
      <p>If you already have an account then please do <Link to="/register">Login</Link> </p>

    </div>
  )
}

export default Register
