import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types'; 
import Drawer from 'material-ui/Drawer';
import Facility from '../Facility/Facility';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from '/Users/kyleclawson/dvmtn/personal-project/node_modules/@material-ui/icons/Close.js';
import LogoutSnackbar from '../LogoutSnackbar/LogoutSnackbar';
import { connect } from 'react-redux';
import { loggingOut } from '../../ducks/reducer';

const styles = {
    root: {
        flexGrow:1,
    },
    flex: {
        flex:1
    },
    menuButton: {
        marginLeft: -8,
        marginRight: 20,
    },
    drawer: {
        width:200,
    }
};

class AppMenu extends Component {
    constructor(){
        super();
        this.state = {
            auth:true,
            anchorEl:null,
            drawer:true,
            open:false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    
    handleChange = ( event, checked ) => {
        this.setState({auth: checked})
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    toggleDrawer ( bool ){
        this.setState({
            drawer: bool
        })
    }
    logout () {
        this.handleClose;
        axios.delete('/api/logout').then ( res => {
            this.props.loggingOut(true)
            this.props.history.push('/')
            }
        )
    }
    render (){
        const { classes } = this.props;
        const {auth, anchorEl } = this.state;
        const open = Boolean( anchorEl );

        return (
            <div className={ classes.root }>
                <div className={classes.drawer}>
                    <Drawer open={this.state.drawer} onClose={()=> this.toggleDrawer(false)} >
                        <Facility
                            toggleDrawerFn = {this.toggleDrawer}
                        />
                    </Drawer>
                </div>
                <AppBar position="fixed">
                        <ToolBar>
                            <IconButton className={ classes.menuButton } 
                                color='inherit' 
                                aria-label='menu'
                                onClick={() => this.toggleDrawer(true)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant='title' color='inherit' className={ classes.flex }>
                            Menu
                            </Typography>
                        
                            {auth && (
                                <div>
                                    <IconButton 
                                        aria-owns={ open ? 'menu-appbar': null }
                                        aria-haspopup='true'
                                        onClick={ this.handleMenu }
                                        color='inherit'
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id='menu-appbar'
                                        anchorEl={ anchorEl }
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal:'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={ open }
                                        onClose={ this.handleClose }
                                    >
                                        <MenuItem onClick={ () => this.logout() }>Logout</MenuItem>
                                    </Menu>
                                </div>
                            )}
                    </ToolBar>
                </AppBar>

            </div>
        )
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired
}



export default withRouter( connect(null, {loggingOut})(withStyles(styles)(AppMenu)));