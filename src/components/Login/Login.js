import React, { Component } from 'react';
import { loginUser } from './../../ducks/reducer';
import { Link }  from 'react-router-dom';

function Login () {
        return (
            <div>
                <div>
                    <a href = 'http://localhost:3005/auth'><button>Login</button></a>
                </div>
            </div>
        )
    }


export default Login