import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import SavedADL from './../SavedADL/SavedADL'
export default function ADL( props ){
    // constructor() {
    //     super();
    //     this.state = {
    //         adlChoice:
    //     }
    // }
    const { primaryChoices, secondaryChoices, tertiaryChoices, explanation, primaryExplain, secondaryExplain, tertiaryExplain, ADLSchemaID } = props.displayADL;
    const { handleValueFn } = props;
    let primaryButtons = [];
    let secondaryButtons = [];
    let tertiaryButtons = [];
    
    
    function displayButtons (choiceSet, choiceExplain, choiceValue) {
        if (choiceSet){
            let choiceButtons = choiceSet.map( (choice, i) => {
                return (
                    <button key = { i }
                    onClick = { () => { handleValueFn( choice.value, choice.ADLSchemaID, moment().format('Do MMMM YYYY, h:mm:ss a'));
                    }}>{ choice.choice }
                    </button>
                )
            });
            return (
            <div>
                <p>{ choiceExplain }</p>
                { choiceButtons }
                <SavedADL/>
            </div>)

        } else {
            let choiceButtons = null;
        }
    }
    return (
        <div>
            
                { displayButtons( primaryChoices, primaryExplain )}
                { displayButtons( secondaryChoices, secondaryExplain )}
                { displayButtons( tertiaryChoices, tertiaryExplain )}
        </div>
    )
}