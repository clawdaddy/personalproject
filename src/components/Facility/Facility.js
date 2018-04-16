import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

export default class Facility extends Component{
    constructor(){
        super();
        this.state={
            facilities : [
                {
                    id:0,
                    facilityName:'example facility'
                }
            ]
        }
    }
    componentDidMount(){
        axios.get('/api/facility').then( response => {
            this.setState({
                facilities: response.data,
            })
            console.log(response);
        })
    }
    render(){
        
        return (
            <div>facilities</div>
        )
    }

}