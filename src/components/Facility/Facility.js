import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 300,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    }
});

class Facility extends Component{
    constructor(){
        super();
        this.state={
            facility : 
                {
                    id:0,
                    name:'example facility',
                    caregroups: ['group1','group2']
                },
            search: '',
            group:'group1',
        }
    }
    handleChange( event ){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    getFacility () {
        const { search } = this.state;
        axios.get(`/api/facility/${search}`).then( response => {
            
            this.setState({facility: response.data[0]})
        })
    }
    render(){
        const { classes } = this.props;
        const { caregroups } = this.state.facility;
        console.log(caregroups);
        
        return (
            <div>
                <form className={ classes.container } autoComplete='on'>
                    <TextField 
                        id='search'
                        label='Input Facility'
                        className={ classes.textField }
                        value={ this.state.search }
                        name='search'
                        onChange = {(e) => this.handleChange(e)}
                        margin='normal'
                    />
                    <Button 
                        variant='raised' 
                        className = {classes.button} 
                        color='primary' 
                        onClick= { () => this.getFacility()}
                    >
                    Get Residents
                    </Button>
                    <FormControl className={ classes.formControl }>
                        <InputLabel htmlFor='group-select'>Group</InputLabel>
                        <Select 
                            
                            value={ this.state.group }
                            onChange = {(e) => this.handleChange(e)}
                            inputProps={{
                                name: 'group',
                                id: 'group-select'
                            }}
                        >
                            {caregroups.map( group => 
                                ( <MenuItem 
                                    value={group}
                                    key={group}
                                    > 
                                    {group} 
                                </MenuItem> )
                                )
                            }
                        </Select>

                    </FormControl>
                </form>
                
            </div>
        )
    }

}

Facility.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Facility)