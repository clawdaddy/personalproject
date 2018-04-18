import React, { Component } from 'react';
import { loginUser } from './../../ducks/reducer';
import { Link }  from 'react-router-dom';
import Button from 'material-ui/Button';
import './_Login.scss';



function Login () {
        return (
            <div className = 'login'>
                <h1>Oh CNAp</h1>
                <a href = 'http://localhost:3005/login'>
                    <Button variant='raised' >
                        Login
                    </Button>
                </a>
            </div>
        )
    }
export default Login