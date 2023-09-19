import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }
  return (
    <div className="login">
        <div className="login__logo">
            <img src='https://drive.google.com/uc?export=download&id=1gwEJXMc7KSDEgG3OB1QP3GqHuK133qu1'
            alt='Discord logo'
            />
        </div>
        <Button onClick={signIn}>Sign in</Button>
    </div>
  )
}

export default Login