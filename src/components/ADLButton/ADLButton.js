import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        height:80,
        width:80
    }
})
function ADLButton (props){
    const {name, id, handleClickFn, classes} = props;
    return (
        <Button 
        className={ classes.root }
        variant= {'raised'}
        onClick = { () => handleClickFn( id ) }
        > 
        { name } 
        </Button>
    )
}


ADLButton.propTypes = {
    classes:PropTypes.object.isRequired,
};

export default withStyles(styles)(ADLButton)