import React, { Component } from 'react';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class SelectedADL extends Component{
    constructor(){
        super();
        this.state = {
            displayChoice: -1,
            text:"none selected",
            rerender:false
        }
    }

    componentDidUpdate ( prevProps, prevState, snapshot ){
        const { choiceSet, selectedResidentID, choiceObjects, currentADLID, displayADL, rerenderADL } = this.props;
        const { prevChoiceSet } = prevProps;
        const { displayChoice } = prevState;
        const { rerender } = this.state;

        if (rerender !== rerenderADL){
            this.setState({rerender:!rerender})
        }


        let choiceText = ""
        let choiceSetKey = _.findKey(displayADL, property => {
            return property.explain === choiceSet.explain
        })
        let choiceObject = _.find(choiceObjects, choiceObj => {
            return (choiceObj.residentID === selectedResidentID &&
            choiceObj.adlID === currentADLID &&
            choiceObj.choiceSetKey === choiceSetKey)
        })

        if ( !choiceObject ){
            choiceText = 'none selected'
        } 
        else if ( displayChoice === choiceObject.adlChoiceVal){
            null
        } else {
            this.setState({
                displayChoice: choiceObject.adlChoiceVal,
                text: choiceObject.adlChoiceExplain
            })
            
            // let choiceObject = _.find( choiceSet.choices, ( choice ) => {
            //     return choice.value === choiceSet.selected
            // })
            // choiceText = choiceObject.choice
            // this.setState({
            //     displayChoice:choiceSet.selected,
            // })
            // this.setState ( { text: choiceText} )
        }
    }
   
    render(){
        console.log('current choice objects: ',this.props.choiceObjects)
        console.log('currentADL', this.props.currentADLID)
        const { text } = this.state;
        console.log(this.props)
        const { rerender, displayChoice } = this.state;
        const { choiceSet, selectedResidentID, choiceObjects, currentADLID, displayADL, rerenderADL } = this.props;
        
        let choiceText = ""
        let choiceSetKey = _.findKey(displayADL, property => {
            return property.explain === choiceSet.explain
        })
        let choiceObject = _.find(choiceObjects, choiceObj => {
            return (choiceObj.residentID === selectedResidentID &&
            choiceObj.adlID === currentADLID &&
            choiceObj.choiceSetKey === choiceSetKey)
        })

        if ( !choiceObject ){
            choiceText = 'none selected'
        } 
        else if ( displayChoice === choiceObject.adlChoiceVal){
            null
        } else {
            this.setState({
                displayChoice: choiceObject.adlChoiceVal,
                text: choiceObject.adlChoiceExplain
            })}

        return(
            <div>
                <p>Current Choice: { text }</p>
                
            </div>
        )
    }
}

function mapStateToProps ( state ){
    return {
        selectedResidentID: state.selectedResidentID,
        choiceObjects: state.choiceObjects,
        currentADLID: state.currentADLID,
        rerenderADL: state.rerenderADL
    }
}

export default connect (mapStateToProps, null)(SelectedADL)