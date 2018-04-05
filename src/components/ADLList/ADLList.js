import React, {Component} from 'react';
import ADLButton from '../ADLButton/ADLButton';
import ADL from '../ADL/ADL';
import _ from 'lodash';
export default class ADLList extends Component {
    constructor(){
        super();
        this.state = {
            list:[
                {
                    ADLSchemaID:0,
                    ADLName:"Bed Mobility",
                    residentID:0,
                    explanation:"How resident adjusts self in bed",
                    primary: {
                        explain:"Self Performance",
                        choices:[
                            {
                                choice:'Independent',
                                value: 0
                            },
                            {
                                choice:'Supervision', 
                                value: 1
                            },
                            {
                                choice: 'Limited Assistance',
                                value: 2
                            },
                            {
                                choice: 'Extensive Assistance',
                                value: 3
                            },
                            {
                                choice: 'Total Dependence',
                                value: 4
                            },
                            {
                                choice: 'Did Not Occur',
                                value: 8
                            }
                        ],
                        selected : -1,
                    },
                    secondary: {
                        explain:"Support Provided",
                        choices: [
                            {
                                choice:'No Setup',
                                value: 0
                            },
                            {
                                choice:'Setup', 
                                value: 1
                            },
                            {
                                choice: 'One Person Assist',
                                value: 2
                            },
                            {
                                choice: 'Two Person Assist',
                                value: 3
                            },
                            {
                                choice: 'Did Not Occur',
                                value: 8
                            }
                        ],
                        selected : -1
                    }
                },
                {
                    ADLSchemaID:1,
                    residentID:0,
                    ADLName: "Bathing",
                    explanation:"How resident bathes",
                    primary:{
                        explain:"Self Performance",
                        choices:[
                            {
                                choice:'Independent',
                                value: 0
                            },
                            {
                                choice:'Supervision', 
                                value: 1
                            },
                            {
                                choice: 'Limited Assistance',
                                value: 2
                            },
                            {
                                choice: 'Extensive Assistance',
                                value: 3
                            },
                            {
                                choice: 'Total Dependence',
                                value: 4
                            },
                            {
                                choice: 'Did Not Occur',
                                value: 8
                            }
                            ],
                            selected: -1,
                        },   
                    secondary:{
                        explain: "Support Provided",
                        choices: [
                            {
                                choice:'No Setup',
                                value: 0
                            },
                            {
                                choice:'Setup', 
                                value: 1
                            },
                            {
                                choice: 'One Person Assist',
                                value: 2
                            },
                            {
                                choice: 'Two Person Assist',
                                value: 3
                            },
                            {
                                choice: 'Did Not Occur',
                                value: 8
                            }
                        ],
                        selected: -1,
                    },
                    tertiary:{
                        explain: "type of bathing",
                        choices: [
                            {
                                choice:'Shower', 
                                value: 0
                            },
                            {
                                choice:'Full body bath',
                                value:1 
                            },
                            {
                                choice:'Bed bath',
                                value:2
                            }
                        ],
                        selected: -1
                    }
                }
            ],
            currentADL:-1,
        }
        this.handleClick = this.handleClick.bind( this );
        this.handleValue = this.handleValue.bind( this );
    }
    handleClick ( ADLSchemaID ){
        this.setState({currentADL: ADLSchemaID})
    }

    handleValue ( choiceValue, choiceID, timeStamp ){
        
    }
    chosenADL (){
        const { list, currentADL } = this.state;
        if ( currentADL >= 0 ){
            let displayADL = _.find(list, ( element ) => { return element.ADLSchemaID === currentADL } )
            return (
                <ADL displayADL = {displayADL} 
                handleValueFn = { this.handleValue }/>
            )
        }
    }
    render (){
        let newList = this.state.list.map( (adl, i) => {
            return <ADLButton ADLName = { adl.ADLName }
                        key = {i}
                        handleClickFn = { this.handleClick }
                        ADLSchemaID = { adl.ADLSchemaID }/>
        })

        return (
            <div>
                
                { newList }
                { this.chosenADL() }
                
            </div>
        )
    }
}