import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { updateADL } from '../../ducks/reducer';
import { connect } from 'react-redux';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        height:80,
        width:80
    }
})
function ADLButton (props){
    const {adl, classes } = props;
    console.log(props)
    return (
        <Button 
        className={ classes.root }
        variant= {'raised'}
        onClick = { () => props.updateADL( adl.id ) }
        > 
        { adl.name } 
        </Button>
    )
}


ADLButton.propTypes = {
    classes:PropTypes.object.isRequired,
};


export default connect (null, { updateADL })(withStyles(styles)(ADLButton))