import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import SelectedADL from './../SelectedADL/SelectedADL';
import SaveButton from '../SaveButton/SaveButton';
import EditButton from '../EditButton/EditButton';
import { connect } from 'react-redux';

function ADL( props ){
    // constructor() {
    //     super();
    //     this.state = {
    //         adlChoice:
    //     }
    // }
    const { primary, secondary, tertiary, explanation, id, name } = props.displayADL;
    const { handleValueFn } = props;
    let primaryButtons = [];
    let secondaryButtons = [];
    let tertiaryButtons = [];
    
    // I AM SETTING THIS UP SO THAT IT GETS THE ADL INFO
    //FROM THE REDUX STORE, I NEED TO FINISH THIS BEFORE IT WILL
    //WORK AGAIN
    function displayButtons ( choiceSet ) {
        const { displayADL, currentADLID, choiceObjects, selectedResidentID } = props;
        const choiceSetKey = _.findKey( displayADL, set =>
            {return set.explain === choiceSet.explain }
        )
        if (choiceSet){
            let choiceButtons = _.map( choiceSet.choices, (choice, i) => {
                return (
                    <button key = { i }
                    onClick = { () => { handleValueFn( choiceSet, choice.value, id, moment().format('Do MMMM YYYY, h:mm:ss a'), choice.choice, choiceSetKey);
                    }}>{ choice.choice }
                    </button>
                )
            });
            return (
            <div>
                <p>{ choiceSet.explain }</p>  
                { choiceButtons }
                <SelectedADL choiceSet = { choiceSet }
                displayADL = { displayADL }
                // currentADLID = { currentADLID }
                // choiceObjects = { choiceObjects }
                // selectedResidentID = { selectedResidentID }
                />
            </div>)

        } else {
            let choiceButtons = null;
        }
    }
    return (
        <div>
                {name}
                { displayButtons( primary )}
                { displayButtons( secondary )}
                { displayButtons( tertiary )}
        </div>
    )
}


function mapStateToProps ( state ) {
    return {
        currentADLID: state.currentADLID
    }
}

export default connect (mapStateToProps, null)(ADL)