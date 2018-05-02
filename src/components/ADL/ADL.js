import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import SelectedADL from './../SelectedADL/SelectedADL';
import SaveButton from '../SaveButton/SaveButton';
import { connect } from 'react-redux';


function ADL( props ){
    const { primary, secondary, tertiary, explanation, id, name } = props.displayADL;
    const { displayADL } = props;
    const { handleValueFn } = props;
    let primaryButtons = [];
    let secondaryButtons = [];
    let tertiaryButtons = [];
    function displayButtons ( choiceSet ) {
        const { currentADLID, choiceObjects, selectedResidentID } = props;
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
                <SaveButton primaryADL = {primary}
                secondaryADL = {secondary}
                tertiaryADL = {tertiary}
                displayADL = {displayADL}
                
                />
        </div>
    )
}


function mapStateToProps ( state ) {
    return {
        currentADLID: state.currentADLID
    }
}

export default connect (mapStateToProps, null)(ADL)