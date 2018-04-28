import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '/Users/kyleclawson/dvmtn/personal-project/node_modules/@material-ui/icons/Close.js';
import { connect } from 'react-redux';
import {loggingOut} from '../../ducks/reducer';

const styles = theme => ({
    close: {
        width:theme.spacing.unit *4,
        height: theme.spacing.unit*4
    }
})

class LogoutSnackbar extends Component {
    constructor(){
        super();
        this.state = {
            open: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.loggedOut === true && this.props.open !== prevProps.open){
            this.setState({
                open:true
            })
            this.props.loggingOut(false)
        }
    }
    handleClose(){
        this.setState({
            open:false
        })
    }
    render(){
        return(
        <div>
        <Snackbar
            anchorOrigin={{
                vertical:'top',
                horizontal:'center'
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={ () => this.handleClose}
            message={'You have been successfully logged out'}
            />
        </div>
        )
    }
}


LogoutSnackbar.propTypes = {
    classes: PropTypes.object.isRequired
}

function mapStateToProps( state) {
    return {
        loggedOut: state.loggedOut
    }
}
export default connect(mapStateToProps, {loggingOut})(withStyles(styles)(LogoutSnackbar))