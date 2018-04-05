import React, { Component } from 'react';
import { loginUser } from './../../ducks/reducer';
import { Link }  from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:"",
            password:"",
            facilityID:""
        }
    }


    
    render (){

        return (
            <div>
                <h1>Login</h1>
                <div>
                    <input type="text" placeholder = "username"/>
                    <input type="text" placeholder = "password"/>
                    <input type="text" placeholder = "facilityID"/>
                    <br/>
                    {/* ACTUAL LOGIN IS CURRENTLY DISABLED--WILL USE AUTH0 IN THE FUTURE--FOR NOW LOGIN SIMPLY REDIRECTS TO DASHBOARD */}
                    <Link to='/dashboard' ><button>Login</button> </Link>
                </div>
            </div>
        )
    }
}

export default Login