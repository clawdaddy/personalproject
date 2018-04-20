import React, { Component } from 'react';
import _ from 'lodash';

class SelectedADL extends Component{
    constructor(){
        super();
        this.state = {
            displayChoice: -1,
            text:"none selected"
        }
    }
    componentDidUpdate ( prevProps ){
        const { choiceSet } = this.props;
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
        this.setState ( { text: choiceText})
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

export default SelectedADL