import React, { Component } from 'react';
import { loginUser } from './../../ducks/reducer';
import { Link }  from 'react-router-dom';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { loggingOut } from '../../ducks/reducer';
import './_Login.scss';
import LogoutSnackbar from '../LogoutSnackbar/LogoutSnackbar';



function Login (props) {
    const { loggedOut, loggingOut} = props;
    function snackbar(){
        if (loggedOut){
            return (
                <LogoutSnackbar/>
            )
        }
    }
        return (
            <div className = 'login'>
                <h1>Oh CNAp</h1>
                <a href = { process.env.REACT_APP_LOGIN }>
                    <Button variant='raised' >
                        Login
                    </Button>
                </a>
                {snackbar()}
            </div>
        )
    }
function mapStateToProps( state ){
    return {
        loggedOut:state.loggedOut
    }
}
export default connect(mapStateToProps,{loggingOut})(Login)