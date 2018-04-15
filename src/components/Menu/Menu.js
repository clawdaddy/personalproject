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
};

class AppMenu extends Component {
    state = {
        auth:true,
        anchorEl:null
    };
    handleChange = ( event, checked ) => {
        this.setState({auth: checked})
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render (){
        const { classes } = this.props;
        const {auth, anchorEl } = this.state;
        const open = Boolean( anchorEl );

        return (
            <div className={ classes.root }>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={ auth } onChange={ this.handleChange } aria-label="LoginSwitch"/>
                        } 
                        label={auth ? 'Logout':'Login'}
                        position='fixed'
                        />

                </FormGroup>
                <AppBar position="fixed">
                        <ToolBar>
                            <IconButton className={ classes.menuButton } color='inherit' aria-label='menu'>
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
                                        <MenuItem onClick={ this.handleClose }>Placeholder1</MenuItem>
                                        <MenuItem onClick={ this.handleClose }>Placeholder2</MenuItem>
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

export default withStyles(styles)(AppMenu);