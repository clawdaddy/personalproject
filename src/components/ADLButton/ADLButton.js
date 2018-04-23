import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { updateADL,  rerender } from '../../ducks/reducer';
import { connect } from 'react-redux';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        height:80,
        width:80
    }
})


function ADLButton (props){
    const {adl, classes, rerender, rerenderADL, updateADL } = props;
    console.log(props)
    function clickFunctions( id, updateADL, rerender, rerenderADL ){
        console.log('should rerender')
        updateADL( id );
        rerender(!rerenderADL);
    }
    return (
        <Button 
        className={ classes.root }
        variant= {'raised'}
        onClick = { () => clickFunctions( adl.id, updateADL, rerender, rerenderADL ) }
        > 
        { adl.name } 
        </Button>
    )
}


ADLButton.propTypes = {
    classes:PropTypes.object.isRequired,
};
function mapStateToProps ( state ){
    return {
        rerenderADL: state.rerenderADL
    }
}

export default connect (mapStateToProps, { updateADL, rerender })(withStyles(styles)(ADLButton))