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
    const { primary, secondary, tertiary, explanation, ADLSchemaID } = props.displayADL;
    const { handleValueFn } = props;
    let primaryButtons = [];
    let secondaryButtons = [];
    let tertiaryButtons = [];
    
    
    function displayButtons ( choiceSet ) {
        if (choiceSet){
            let choiceButtons = _.map( choiceSet.choices, (choice, i) => {
                return (
                    <button key = { i }
                    onClick = { () => { handleValueFn( choiceSet, choice.value, ADLSchemaID, moment().format('Do MMMM YYYY, h:mm:ss a'));
                    }}>{ choice.choice }
                    </button>
                )
            });
            return (
            <div>
                <p>{ choiceSet.explain }</p>
                { choiceButtons }
                <SavedADL choiceSet = { choiceSet }/>
            </div>)

        } else {
            let choiceButtons = null;
        }
    }
    return (
        <div>
            
                { displayButtons( primary )}
                { displayButtons( secondary )}
                { displayButtons( tertiary )}
        </div>
    )
}