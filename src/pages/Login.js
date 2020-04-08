import React, { useState } from "react";
import {auth} from '../firebase';

const Login = () => {
  const {page, container, button, header, wrapper} = style;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h3 style={{ margin: 0 }}>reactfirenotes</h3>
        </div>
        <div style={container}>
          <div className={"input-field"}>
            <input
              type="email"
              name={"userEmail"}
              id={"userEmail"}
              placeholder={"Email"}
              onChange={(event) => {onChangeHandler(event)}}
            />
            <input
              type="password"
              name={"userPassword"}
              id={"userPassword"}
              placeholder={"Password"}
              onChange={(event) => {onChangeHandler(event)}}
            />
          </div>
          <div>
            <a
              className="waves-effect waves-light btn"
              style={button}
              disabled={false}
              onClick={(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
            >
              Login
            </a>
            <a className="waves-effect waves-light btn red"
               style={button}
               onClick={(event) => {createUserWithEmailAndPasswordHandler(event, email, password)}}
               disabled={false}
            >Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};


const style = {
  page:
    {
      display: 'flex',
      maxWidth: window.innerWidth,
      height: window.innerHeight,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',

    },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 500,

    boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)'
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  header: {
    display: "flex",
    flex: 0.1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    backgroundColor: '#424242',
    color: 'white',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    // minWidth: 500,
    maxWidth: 1000,

  }
}

export default Login;
