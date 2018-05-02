import React, {Component} from 'react';
import Resident from '../Resident/Resident';
import ADLList from '../ADLList/ADLList';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { connect } from 'react-redux';
import { selectResident, updateResidentList, showResidentCard, showadllist } from '../../ducks/reducer';
import axios from 'axios';


//Resident list will get the list of residents and display them--it needs
//their name, pic, and id. I'll hit the backend through
//redux -- from here I need to get the current resident ID to redux, also something to indicate a resident has been picked
//axios calls made from redux??? not a bad idea if I put in other features that need the residents
const styles = theme => ({ 
    root: {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-around',
        overflow:'hidden',
        backGroundColor: theme.palette.background.paper,
        marginTop:75
        
    },
    gridList: {
        flexWrap:'nowrap',
        transform:'translateZ(0)',
        height:100,
        width:500,
    },
    title: {
        color: theme.palette.primary.light,
    },
    tile: {
        borderColor: theme.palette.secondary.main,
        border: 20,
        borderRadius: 50
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, grba(0,0,0,0) 100%)',
        flexWrap:'nowrap'

    },
    paper: {

    }
});

class ResidentList extends Component {
    constructor(){
        super();
        
        this.pickResident = this.pickResident.bind(this);
    }

    componentDidUpdate (prevProps, prevState, snapshot){
        if (prevProps.group === this.props.group){
            null
        } else {
            const { group, selectResident, updateResidentList } = this.props;
            const { id } = this.props.facility;
            console.log(group)
            if (group){
                axios.post(`/api/group`, {group, id}).then( response => {
                    
                    updateResidentList( response.data )
                })
            }
        }
    }


    pickResident(currentResidentID){
        this.props.selectResident(currentResidentID);
        this.props.showResidentCard(true);
        this.props.showadllist(true);
       
    }

    render (){
        const { classes, residentList, group, selectedResidentID, showResident } = this.props;
        function displayResident (){
            if (selectedResidentID && showResident === true){
                let currentResident = _.find(residentList, (resident) => {
                    return resident.id === selectedResidentID
                })
                return (
                    <Resident   resident = { currentResident }
                        />
                )
            }
        }
        
        return(
            <div className = { classes.root } >
                <GridList className={ classes.gridList } 
                cols={ 6 }
                rows={2}
                cellHeight='auto'>
                    {residentList.map( tile => (
                        <GridListTile 
                        key = { tile.id } 
                        onClick={ () => this.pickResident(tile.id)}
                        className = { classes.tile }
                        >
                        <img src={ tile.pic } alt={ `${tile.firstName} ${tile.lastName}`} />
                        <GridListTileBar
                        title={ `${tile.firstname} ${tile.lastname}`}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        titlePosition={'top'}
                        // actionIcon={
                        //     <IconButton>
                        //         <StarBorderIcon className={ classes.title } />
                        //     </IconButton>
                        // }
                        />
                        </GridListTile>
                        
                    )
                    )}
                </GridList>
                {displayResident()}
            </div>
        )
    }
}

ResidentList.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps ( state ){
    return {
        group: state.group,
        facility: state.facility,
        residentList: state.residentList,
        selectedResidentID: state.selectedResidentID,
        showResident: state.showResident
    }
}

export default connect(mapStateToProps, { selectResident, updateResidentList, showResidentCard, showadllist }) (withStyles(styles)(ResidentList))