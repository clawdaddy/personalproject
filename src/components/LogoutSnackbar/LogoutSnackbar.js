import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
    componentDidMount(){
        if (this.props.loggedOut === true ){
            this.setState({
                open:true
            })
        }
    }
    handleClose(){
        
        this.setState({
            open:false
        })
        const wait = (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve,ms)
            })
        }
        async function callRedux() {
            await wait(1000);
            this.props.loggingOut(false)
        }
    }
    render(){
        const { open } = this.state
        const { classes } = this.props;
        return(
        <div>
                <Snackbar
                    anchorOrigin={{
                        vertical:'top',
                        horizontal:'center'
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={ () => this.handleClose()}
                    message={'You have been successfully logged out'}
                    action={[
                        <IconButton key='close' aria-label='Close'
                        color='inherit' className={classes.close}
                        onClick={ () => this.handleClose()}
                        >
                        <CloseIcon/>
                        </IconButton>
                    ]}
                />
        </div>
        
        )
    }
}


LogoutSnackbar.propTypes = {
    classes: PropTypes.object.isRequired
}

function mapStateToProps( state ) {
    return {
        loggedOut: state.loggedOut
    }
}
export default connect(mapStateToProps, {loggingOut})(withStyles(styles)(LogoutSnackbar))