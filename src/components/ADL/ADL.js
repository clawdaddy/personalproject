import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import SelectedADL from './../SelectedADL/SelectedADL';
import SaveButton from '../SaveButton/SaveButton';
import EditButton from '../EditButton/EditButton';

export default function ADL( props ){
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
    
    
    function displayButtons ( choiceSet ) {
        const { displayADL } = props;
        if (choiceSet){
            let choiceButtons = _.map( choiceSet.choices, (choice, i) => {
                return (
                    <button key = { i }
                    onClick = { () => { handleValueFn( choiceSet, choice.value, id, moment().format('Do MMMM YYYY, h:mm:ss a'));
                    }}>{ choice.choice }
                    </button>
                )
            });
            return (
            <div>
                <p>{ choiceSet.explain }</p>  
                { choiceButtons }
                <SelectedADL choiceSet = { choiceSet }/>
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