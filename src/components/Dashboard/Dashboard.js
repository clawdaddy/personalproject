import React, {Component} from 'react'
import ResidentList from '../ResidentList/ResidentList'
import './_Dashboard.scss'

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
            <div className='dashboard'>
                <ResidentList/>
            </div>
        )
    }
}