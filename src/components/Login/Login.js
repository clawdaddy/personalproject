import React from 'react';
import { loginUser } from './../../ducks/reducer';
import { Link }  from 'react-router-dom';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import './_Login.scss';
import LogoutSnackbar from '../LogoutSnackbar/LogoutSnackbar';



function Login (props) {
    const { loggedOut, loggingOut} = props;
    function snackbar(){
        if (loggedOut){
            return (
                <LogoutSnackbar
                update = {true}/>
            )
        }
    }
        return (
            <div className = 'login'>
                <h1>Oh CNAp</h1>
                <a href = { process.env.REACT_APP_LOGIN }>
                    <Button className='login-button' variant='raised' >
                        Login
                    </Button>
                </a>
                {loggedOut
                ? <LogoutSnackbar/>
                : null}
            </div>
        )
    }
function mapStateToProps( state ){
    return {
        loggedOut:state.loggedOut
    }
}
export default connect(mapStateToProps, null)(Login)