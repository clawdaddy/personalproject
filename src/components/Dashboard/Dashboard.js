import React, {Component} from 'react';
import ResidentList from '../ResidentList/ResidentList';
import './_Dashboard.scss';
import Menu from '../Menu/Menu';
import Grid from 'material-ui/Grid';
import Facility from '../Facility/Facility';

export default class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            shift:"",
            facility:0
        }
    }
    

    render (){

        return (
            <div className='dashboard'>
                
                <Grid justify='center' alignItems='center' alignContent='center'>
                    <Menu/>
                    <Facility/>
                    <ResidentList/>
                </Grid>
            </div>
        )
    }
}