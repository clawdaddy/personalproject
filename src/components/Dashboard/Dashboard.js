import React, {Component} from 'react';
import ResidentList from '../ResidentList/ResidentList';
import './_Dashboard.scss';
import Menu from '../Menu/Menu';
import Grid from 'material-ui/Grid';

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
                <Menu/>
                <Grid justify='center' alignItems='center' alignContent='center'>
                    <ResidentList/>
                </Grid>
            </div>
        )
    }
}