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
            text:"none selected"
        }
    }
    componentDidUpdate ( prevProps, prevState, snapshot ){
        const { choiceSet, selectedResidentID, choiceObjects } = this.props;
        const { prevChoiceSet } = prevProps;
        const { displayChoice } = this.state;
        let choiceText = ""
        if ( choiceSet.selected === -1 ){
            choiceText = 'none selected'
        } 
        else if ( displayChoice === choiceSet.selected){
            null
        } else {
            let choiceObject = _.find( choiceSet.choices, ( choice ) => {
                return choice.value === choiceSet.selected
            })
            choiceText = choiceObject.choice
            this.setState({
                displayChoice:choiceSet.selected,
            })
        this.setState ( { text: choiceText} )
        }
    }
   
    render(){
        const { text } = this.state;
        
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
        choiceObjects: state.choiceObjects
    }
}

export default SelectedADL