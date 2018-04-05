import React, {Component} from 'react';
import ADLList from '../ADLList/ADLList'
export default class Resident extends Component {
    // constructor(){
    //     super();
    //     this.state = {
            
    //     }
    // }


    render(){
        const { firstName, lastName, pic, id, age, diet, code} = this.props.resident;
        const { pickResidentFn, extraInfo } = this.props;
        return(
            <div>
                <img src = {pic} onClick = { () => pickResidentFn(id) }/>
                <p>{lastName}, { firstName }</p>
                { (extraInfo)
                ? <div>
                    <p>Age: {age}</p>
                    <p>Diet: {diet}</p>
                    <p>Code: {code} </p>
                    </div>
                : null}
            </div>
        )
    }
}