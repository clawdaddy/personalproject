import React, {Component} from 'react'
import ResidentList from '../ResidentList/ResidentList'
export default class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            shift:"",
            facility:0
        }
    }
    

    render (){

        return (
            <div>
                <p>Dashboard</p>
                <ResidentList/>
            </div>
        )
    }
}