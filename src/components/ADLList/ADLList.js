import React, {Component} from 'react';
import ADLButton from '../ADLButton/ADLButton';
import ADL from '../ADL/ADL';
import SavedADL from '../SavedADL/SavedADL'
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';


class ADLList extends Component {
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
                        timeStamp: null
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
                        selected : -1,
                        timeStamp: null
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
                            timeStamp: null
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
                        timeStamp: null
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
                        selected: -1,
                        timeStamp: null
                    }
                }
            ],
            currentADL:-1,
        }
        this.handleClick = this.handleClick.bind( this );
        this.handleValue = this.handleValue.bind( this );
    }

    componentDidMount(){
        axios.get('/api/adllist').then( response => {
            this.setState({list: response.data})
        })
    }
    handleClick ( ADLSchemaID ){
        this.setState({currentADL: ADLSchemaID})
    }

    handleValue ( choiceSet, choiceValue, choiceID, timeStamp ){
        const { list } = this.state;
        let newList = [...list];
        let adlIndex = _.findIndex( newList, ( adl ) => {
            return adl.ADLSchemaID === choiceID ;
        })
        let key = _.findKey(newList[adlIndex], ( property ) => {
            return property.explain === choiceSet.explain;
        })
        
        newList[adlIndex][key].selected = choiceValue;
        newList[adlIndex][key].timeStamp = timeStamp;
        this.setState({ list: newList });
        
    }
    chosenADL (){
        const { list, currentADL } = this.state;
        if ( currentADL >= 0 ){
            let displayADL = _.find(list, ( element ) => { return element.ADLSchemaID === currentADL } )
            return (
                <div>
                    <ADL displayADL = {displayADL} 
                    handleValueFn = { this.handleValue }/>
                    {/* <SavedADL choiceSet = { displayADL} /> */}
                </div>
            )
        }
    }

    
    render (){
        const { showadl } = this.props;
        const { list } = this.state;
        const { handleClick } = this;
        function displayadllist(){
            if ( showadl === true ){
                let newList = list.map( (adl, i) => {
                    return <ADLButton ADLName = { adl.ADLName }
                                key = {i}
                                handleClickFn = { handleClick }
                                ADLSchemaID = { adl.ADLSchemaID }/>
                })
                return newList;
            }
        }
        return (
            <div>
                
                { displayadllist()
                }
                { this.chosenADL() }
                
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        showadl: state.showadl
    }
}

export default connect(mapStateToProps, null )(ADLList)