import React, {Component} from 'react';
import ADLButton from '../ADLButton/ADLButton';
import ADL from '../ADL/ADL';
import SelectedADL from '../SelectedADL/SelectedADL';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

const styles = theme => ({
    root: {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-around',
        overflow:'hidden',
        backgroundcolor: theme.palette.background.paper
    },
    gridList: {
        flexWrap:'nowrap',
        transform:'translateZ(0)',
        height:100,
        width:500
    },

})


class ADLList extends Component {
    constructor(){
        super();
        this.state = {
            selectedResidentID:-1,
            currentADL:-1,
            ADLsaved: false,
            groupsOnState:[''],
            currentGroup:''
        }
        this.handleClick = this.handleClick.bind( this );
        this.handleValue = this.handleValue.bind( this );
    }

    componentDidMount(){
        axios.get('/api/adllist').then( response => {
            
            
            this.setState({list: response.data})
            console.log(response.data)
            
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        const { groupsOnState, list } = prevState;
        const { group, residentList, selectedResidentID } = this.props;
        
        if ( (!groupsOnState.includes(group)) && (residentList !== prevProps.residentList)){
            let newGroups = [...groupsOnState, group]
            let newGroup = {
                [group]:[...residentList]
            }
            let newGroupWList = newGroup[group].map( (resident, i, arr) => {
                return Object.assign({}, resident, {ADLList:list})
            })
            this.setState({
                groupsOnState:newGroups,
                [group]:newGroupWList,
                currentGroup:group,
                selectedResidentID:selectedResidentID
            })
        }

    }
    handleClick ( id ){
        this.setState({currentADL: id})
    }

    handleValue ( choiceSet, choiceValue, choiceID, timeStamp ){
        const { currentGroup } = this.state;
        const { selectedResidentID } = this.props;
        let residentIndex = _.findIndex( this.state[currentGroup], resident => {
            return resident.id === selectedResidentID
        } )
        let oldADLList = this.state[currentGroup][residentIndex].ADLList
        let newADLList = [...oldADLList];
        let adlIndex = _.findIndex( newADLList, ( adl ) => {
            return adl.id === choiceID ;
        })
        let key = _.findKey(newADLList[adlIndex], ( property ) => {
            return property.explain === choiceSet.explain;
        })
        
        newADLList[adlIndex][key].selected = choiceValue;
        newADLList[adlIndex][key].timeStamp = timeStamp;
        let newResident = Object.assign(
            {}, 
            this.state[currentGroup][residentIndex], 
            {ADLList:newADLList})
        let newGroup = [...this.state[currentGroup]]
        newGroup.splice([residentIndex],1,newResident)
        this.setState({ 
            [currentGroup]: newGroup
         });
        
    }
    chosenADL (){
        const { currentADL, ADLSaved, currentGroup } = this.state;
        const { showadl, classes, selectedResidentID } = this.props;
        let residentIndex = _.findIndex( this.state[currentGroup], resident => {
            return resident.id === selectedResidentID
        } )
        let adlList = [...this.state[currentGroup][residentIndex].ADLList]

        if ( currentADL >= 0 && showadl === true){
            let displayADL = _.find(adlList, ( element ) => { return element.id === currentADL } )
            return (
                <div>
                    <ADL displayADL = {displayADL} 
                    handleValueFn = { this.handleValue }
                    ADLSaved = { ADLSaved }/>
                    {/* <SavedADL choiceSet = { displayADL} /> */}
                </div>
            )
        }
    }

    
    render (){
        const { showadl, classes } = this.props;
        const { list, ADLSaved } = this.state;
        const { handleClick } = this;
        
        return (
            <div className = {classes.root}>
                
                
                {showadl
                ?<GridList className = {classes.gridList}
                cols={5}
                cellHeight='auto'>
                {list.map( (adl, i) => (
                    <GridListTile className = {classes.tile}>
                        <ADLButton name = { adl.name }
                                    key = { adl.name}
                                    handleClickFn = { handleClick }
                                    id = { adl.id }
                                    ADLSaved = { ADLSaved }/>
                    </GridListTile>
                )
                )}
                </GridList> 
                
                :null
            }
                { this.chosenADL() }
                
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        showadl: state.showadl,
        selectedResidentID: state.selectedResidentID,
        residentList: state.residentList,
        group: state.group
    }
}

ADLList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null )(withStyles(styles)(ADLList))

// list:[
            //     {
            //         id:0,
            //         name:"Bed Mobility",
            //         residentID:0,
            //         explanation:"How resident adjusts self in bed",
            //         primary: {
            //             explain:"Self Performance",
            //             choices:[
            //                 {
            //                     choice:'Independent',
            //                     value: 0
            //                 },
            //                 {
            //                     choice:'Supervision', 
            //                     value: 1
            //                 },
            //                 {
            //                     choice: 'Limited Assistance',
            //                     value: 2
            //                 },
            //                 {
            //                     choice: 'Extensive Assistance',
            //                     value: 3
            //                 },
            //                 {
            //                     choice: 'Total Dependence',
            //                     value: 4
            //                 },
            //                 {
            //                     choice: 'Did Not Occur',
            //                     value: 8
            //                 }
            //             ],
            //             selected : -1,
            //             timeStamp: null
            //         },
            //         secondary: {
            //             explain:"Support Provided",
            //             choices: [
            //                 {
            //                     choice:'No Setup',
            //                     value: 0
            //                 },
            //                 {
            //                     choice:'Setup', 
            //                     value: 1
            //                 },
            //                 {
            //                     choice: 'One Person Assist',
            //                     value: 2
            //                 },
            //                 {
            //                     choice: 'Two Person Assist',
            //                     value: 3
            //                 },
            //                 {
            //                     choice: 'Did Not Occur',
            //                     value: 8
            //                 }
            //             ],
            //             selected : -1,
            //             timeStamp: null
            //         }
            //     },
            //     {
            //         id:1,
            //         residentID:0,
            //         name: "Bathing",
            //         explanation:"How resident bathes",
            //         primary:{
            //             explain:"Self Performance",
            //             choices:[
            //                 {
            //                     choice:'Independent',
            //                     value: 0
            //                 },
            //                 {
            //                     choice:'Supervision', 
            //                     value: 1
            //                 },
            //                 {
            //                     choice: 'Limited Assistance',
            //                     value: 2
            //                 },
            //                 {
            //                     choice: 'Extensive Assistance',
            //                     value: 3
            //                 },
            //                 {
            //                     choice: 'Total Dependence',
            //                     value: 4
            //                 },
            //                 {
            //                     choice: 'Did Not Occur',
            //                     value: 8
            //                 }
            //                 ],
            //                 selected: -1,
            //                 timeStamp: null
            //             },   
            //         secondary:{
            //             explain: "Support Provided",
            //             choices: [
            //                 {
            //                     choice:'No Setup',
            //                     value: 0
            //                 },
            //                 {
            //                     choice:'Setup', 
            //                     value: 1
            //                 },
            //                 {
            //                     choice: 'One Person Assist',
            //                     value: 2
            //                 },
            //                 {
            //                     choice: 'Two Person Assist',
            //                     value: 3
            //                 },
            //                 {
            //                     choice: 'Did Not Occur',
            //                     value: 8
            //                 }
            //             ],
            //             selected: -1,
            //             timeStamp: null
            //         },
            //         tertiary:{
            //             explain: "type of bathing",
            //             choices: [
            //                 {
            //                     choice:'Shower', 
            //                     value: 0
            //                 },
            //                 {
            //                     choice:'Full body bath',
            //                     value:1 
            //                 },
            //                 {
            //                     choice:'Bed bath',
            //                     value:2
            //                 }
            //             ],
            //             selected: -1,
            //             timeStamp: null
            //         }
            //     }
            // ],