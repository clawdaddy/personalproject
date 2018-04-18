import React, {Component} from 'react';
import ResidentList from '../ResidentList/ResidentList';
import './_Dashboard.scss';
import Menu from '../Menu/Menu';
import Grid from 'material-ui/Grid';
import Facility from '../Facility/Facility';
import ADLList from '../ADLList/ADLList';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            shift:"",
            facility:0,
            user:{}
        }
    }
    
    //need to have a check endpoint to seea if a user is logged in--if they
    //have an auth_id--on componentDidMount -- get user then setState
    //this.state.user.auth_id ? display : don't display

    componentDidMount(){
        axios.get('/checklogin').then( response =>
                this.setState({user: response.data})
        )
    }

    render (){

        return (
            <div className='dashboard'>
                {/* {this.state.user.authzeroid
                ? */}
                <Grid justify='center' alignItems='center' alignContent='center'>
                    <Menu/>
                    <Facility/>
                    <ResidentList/>
                    <ADLList/>
                </Grid>
                {/* :<div>Unauthorized</div>} */}
            </div>
        )
    }
}