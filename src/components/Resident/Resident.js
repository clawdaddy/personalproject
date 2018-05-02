import React from 'react';
import './_Resident.scss'
import Card, {  CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    media: {
        height:0,
        paddingTop:'125%',
    }
}


function Resident (props) {
    const { firstname, lastname, pic, id, age, diet, code} = props.resident;
    const { classes } = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia 
                className={classes.media}
                image={pic}
                title='Resident'
                />
                <CardContent>
                    <Typography gutterBottom 
                    className={classes.title}
                    component='h2'
                    >
                    {`${firstname} ${lastname}`}
                    </Typography>
                </CardContent>
            </Card>
        </div>

    )
    
    
    
    
    // return(
    //     <div>
    //         <img src = {pic} alt='Resident'/>
    //         <p>{lastname}, { firstname }</p>
    //             <div>
    //             <p>Age: {age}</p>
    //             <p>Diet: {diet}</p>
    //             <p>Code: {code} </p>
    //         </div>
    //     </div>
    // )
}

function mapStateToProps ( state ){
    return {
        selectedResidentID: state.selectedResidentID
    }
}

Resident.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null) (withStyles(styles)(Resident))