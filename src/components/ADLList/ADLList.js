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
import { saveChoiceObject } from '../../ducks/reducer';

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
        }
        // this.handleClick = this.handleClick.bind( this );
        this.handleValue = this.handleValue.bind( this );
    }

    componentDidMount(){
        axios.get('/api/adllist').then( response => {
            
            
            this.setState({list: response.data})
            console.log(response.data)
            
        })
    }

    // componentDidUpdate(prevProps, prevState, snapshot){
    //     const { groupsOnState, list } = prevState;
    //     const { group, residentList, selectedResidentID } = this.props;
        
    //     if ( (!groupsOnState.includes(group)) && (residentList !== prevProps.residentList)){
    //         let newGroups = [...groupsOnState, group]
    //         let newGroup = {
    //             [group]:[...residentList]
    //         }
    //         let newGroupWList = newGroup[group].map( (resident, i, arr) => {
    //             return Object.assign({}, resident, {ADLList:list})
    //         })
    //         this.setState({
    //             groupsOnState:newGroups,
    //             [group]:newGroupWList,
    //             currentGroup:group,
    //             selectedResidentID:selectedResidentID
    //         })
    //     }

    // }
    // handleClick ( id ){
    //     this.setState({currentADL: id})
    // }

    handleValue ( choiceSet, choiceValue, choiceID, timeStamp, choiceExplain, choiceSetKey ){
        const { currentGroup } = this.state;
        const { selectedResidentID, userID, choiceObjects, saveChoiceObject} = this.props;
        let choiceIndex = -1;
        let choiceObj = {}
        let newChoiceObjects = _.slice(choiceObjects, 0, choiceObjects.length)
        let prevChoiceObj = _.find(newChoiceObjects, choiceObject => {

            return (choiceObject.residentID === selectedResidentID 
            && choiceObject.adlID === choiceID 
            && choiceObject.choiceSetKey === choiceSetKey)
        })
        
        if (prevChoiceObj){
            choiceObj = Object.assign({
                residentID:selectedResidentID,
                adlID: choiceID,
                adlChoiceVal: choiceValue,
                adlChoiceExplain: choiceExplain,
                timeStamp: timeStamp,
                userID: userID,
                choiceSetKey: choiceSetKey,
                ADLSaved: prevChoiceObj.ADLSaved,
                saveID: prevChoiceObj.saveID
            })
            choiceIndex = newChoiceObjects.indexOf(prevChoiceObj)
            newChoiceObjects.splice(choiceIndex, 1, choiceObj)
        } else {
            let choiceObj = Object.assign({},
                {
                    residentID:selectedResidentID,
                    adlID: choiceID,
                    adlChoiceVal: choiceValue,
                    adlChoiceExplain: choiceExplain,
                    timeStamp: timeStamp,
                    userID: userID,
                    choiceSetKey: choiceSetKey,
                    ADLSaved: false,
                    saveID: 0
                })
            newChoiceObjects.push(choiceObj)
        }
        saveChoiceObject(newChoiceObjects)
        // let residentIndex = _.findIndex( this.state[currentGroup], resident => {
        //     return resident.id === selectedResidentID
        // } )
        // let oldADLList = this.state[currentGroup][residentIndex].ADLList
        // let newADLList = oldADLList.map( ADL => {
        //     return Object.assign({}, ADL)
        // })
        // let adlIndex = _.findIndex( newADLList, ( adl ) => {
        //     return adl.id === choiceID ;
        // })
        // let key = _.findKey(newADLList[adlIndex], ( property ) => {
        //     return property.explain === choiceSet.explain;
        // })
        //something here assigning stuff to a newADLList
        // let newResident = Object.assign(
        //     {}, 
        //     this.state[currentGroup][residentIndex], 
        //     {ADLList:newADLList})
        // let newGroup = [...this.state[currentGroup]]
        // newGroup.splice([residentIndex],1,newResident)
        // this.setState({ 
        //     [currentGroup]: newGroup
        //  });
        
    }
    chosenADL (){
        const { ADLSaved, list } = this.state;
        const { showadl, classes, selectedResidentID, currentADLID, choiceObjects } = this.props;
        
        //this line needs to change to reference old list, not grouplist
        let adlList = [...list]

        if ( currentADLID >= 0 && showadl === true){
            let displayADL = _.find(adlList, ( element ) => { return element.id === currentADLID } )
            return (
                <div>
                    <ADL displayADL = {displayADL} 
                    handleValueFn = { this.handleValue }
                    key = { displayADL.id }
                    selectedResidentID = { selectedResidentID }
                    currentADLID = { currentADLID }
                    choiceObjects = { choiceObjects }
                    />
                    {/* <SavedADL choiceSet = { displayADL} /> */}
                </div>
            )
        }
    }

    
    render (){
        const { showadl, classes } = this.props;
        const { list } = this.state;
        const { handleClick } = this;
console.log(list)
        return (
            <div className = {classes.root}>
                
                
                {showadl
                ?
                <div>
                    <GridList className = {classes.gridList}
                        cols={5}
                        cellHeight='auto'>
                        {list.map( (adl, i) => (
                            <GridListTile className = {classes.tile}>
                                <ADLButton adl = { adl }
                                            key = { adl.name}
                                            />
                            </GridListTile>
                        )
                        )}
                    </GridList> 
                    { this.chosenADL() }
                </div>
                :null
            }
                
                
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        showadl: state.showadl,
        selectedResidentID: state.selectedResidentID,
        residentList: state.residentList,
        group: state.group,
        userID: state.userID,
        choiceObjects: state.choiceObjects,
        currentADLID: state.currentADLID
    }
}

ADLList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { saveChoiceObject } )(withStyles(styles)(ADLList))

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