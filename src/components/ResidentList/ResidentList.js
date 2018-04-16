import React, {Component} from 'react';
import Resident from '../Resident/Resident';
import ADLList from '../ADLList/ADLList';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';



//Resident list will get the list of residents and display them--it needs
//their name, pic, and id. I'll hit the backend through
//redux?
const styles = theme => ({ 
    root: {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-around',
        overflow:'hidden',
        backGroundColor: theme.palette.background.paper,
        marginTop: 75,
    },
    gridList: {
        flexWrap:'nowrap',
        transform:'translateZ(0)',
        height:100,
        width:500,
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, grba(0,0,0,0) 100%)'

    },
    paper: {

    }
});

class ResidentList extends Component {
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
                {
                    id:5,
                    facilityID:0,
                    firstName:"Torak, Lord of his domain",
                    lastName: 'Merriwhether',
                    age:65,
                    diet:'Regular',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Chimpanzee_selfie.jpg'
                },
                {
                    id:6,
                    facilityID:0,
                    firstName:"Torak, Lord of his domain",
                    lastName: 'Merriwhether',
                    age:65,
                    diet:'Regular',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Chimpanzee_selfie.jpg'
                },
                {
                    id:7,
                    facilityID:0,
                    firstName:"Torak, Lord of his domain",
                    lastName: 'Merriwhether',
                    age:65,
                    diet:'Regular',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Chimpanzee_selfie.jpg'
                },
                {
                    id:8,
                    facilityID:0,
                    firstName:"Torak, Lord of his domain",
                    lastName: 'Merriwhether',
                    age:65,
                    diet:'Regular',
                    code:'full',
                    pic: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Chimpanzee_selfie.jpg'
                },
                {
                    id:9,
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
        const { classes } = this.props;
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
            // <div className='List'>
                
                <div className = { classes.root } >
                    <GridList className={ classes.gridList } 
                    cols={ 5 }
                    cellHeight='auto'>
                        {residents.map( tile => (
                            <GridListTile key = { tile.id } onClick={ () => this.pickResident(tile.id)}>
                            <img src={ tile.pic } alt={ `${tile.firstName} ${tile.lastName}`} />
                            <GridListTileBar
                            title={ `${tile.firstName} ${tile.lastName}`}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton>
                                    <StarBorderIcon className={ classes.title } />
                                </IconButton>
                            }
                            />
                            </GridListTile>
                            
                        )
                        )}
                    </GridList>
                    <Resident   resident = { currentResident }
                        pickResidentFn = { this.pickResident }
                        extraInfo = { true }/>
                </div>
                
            /* //     <p>Old Way</p>
            //     Resident List
            //     { resList }
            //     <Resident   resident = { currentResident }
            //                 pickResidentFn = { this.pickResident }
            //                 extraInfo = { true }/>
            //     <ADLList/>
            // </div> */
        )
    }
}

ResidentList.PropTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResidentList)