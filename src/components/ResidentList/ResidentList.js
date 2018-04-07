import React, {Component} from 'react';
import Resident from '../Resident/Resident';
import ADLList from '../ADLList/ADLList';
import _ from 'lodash';

export default class ResidentList extends Component {
    constructor(){
        super();
        this.state = {
            residents:[
                {
                    id:0,
                    facilityID:0,
                    firstName:'Sue Ellen',
                    lastName: 'Merriwhether',
                    age:68,
                    diet:'Puree',
                    code:'full',
                    pic:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Quentin_Matsys_-_A_Grotesque_old_woman.jpg/182px-Quentin_Matsys_-_A_Grotesque_old_woman.jpg'
                },
                {
                    id:1,
                    facilityID:0,
                    firstName:'Bobby Sue',
                    lastName: 'Merriwhether',
                    age:89,
                    diet:'Chopped',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Katharine_Hepburn_promo_pic.jpg/191px-Katharine_Hepburn_promo_pic.jpg'
                },
                {
                    id:2,
                    facilityID:0,
                    firstName:'Ricky Bobby',
                    lastName: 'Merriwhether',
                    age:72,
                    diet:'NPO',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Charlie_Chaplin.jpg/192px-Charlie_Chaplin.jpg'
                },
                {
                    id:3,
                    facilityID:0,
                    firstName:"'lil Ricky",
                    lastName: 'Merriwhether',
                    age:63,
                    diet:'Regular',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg'
                },
                {
                    id:4,
                    facilityID:0,
                    firstName:"Torak, Lord of his domain",
                    lastName: 'Merriwhether',
                    age:65,
                    diet:'Regular',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Chimpanzee_selfie.jpg'
                },
            ],
            currentResidentID:0,
            
        }
        this.pickResident = this.pickResident.bind(this);
    }
    pickResident(currentResidentID){
        this.setState({
            currentResidentID: currentResidentID,
            
        })
    }

    render (){
        const { residents, currentResidentID } = this.state;
        let resList = residents.map( (resident, i) => {
            return (
                <Resident   resident = { resident }
                            key = { i }
                            pickResidentFn = {this.pickResident}
                />
            )
        })
        let currentResident = _.find(residents, (resident) => {
                return resident.id === currentResidentID
        })
        
        return(
            <div className='List'>
                Resident List
                { resList }
                <Resident   resident = { currentResident }
                            pickResidentFn = { this.pickResident }
                            extraInfo = { true }/>
                <ADLList/>
            </div>
        )
    }
}