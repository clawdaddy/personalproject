import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { selectFacility, selectGroup, showResidentCard, showadllist } from '../../ducks/reducer';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        
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
            this.props.selectFacility(response.data[0])
        })
    }
    render(){
        const { classes, group, facility: {caregroups}, toggleDrawerFn } = this.props;
        
        
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
                            
                            value={ group }
                            onChange = {(e) => {
                                this.props.selectGroup(e.target.value)
                                this.props.showResidentCard(false)
                                this.props.showadllist(false)
                                toggleDrawerFn(false)
                                }
                            }
                            inputProps={{
                                name: 'group',
                                id: 'group-select'
                            }}
                        >
                            {caregroups.map( groupOption => 
                                ( <MenuItem 
                                    value={groupOption}
                                    key={groupOption}
                                    > 
                                    {groupOption} 
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

function mapStateToProps ( state ){
    return {
        facility: state.facility,
        group: state.group,
    }
}
export default connect(mapStateToProps, {selectFacility, selectGroup, showResidentCard, showadllist}) (withStyles(styles)(Facility));