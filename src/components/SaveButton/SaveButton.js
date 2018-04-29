import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { saveChoiceObject } from '../../ducks/reducer';


class SaveButton extends Component {
    constructor(){
        super();
        this.state = {
            saveID:-1,
            buttonDisable:false
        }
    }

    
    
    saveADL( id ){
        const { choiceObjects, selectedResidentID, userID, currentADLID, displayADL, primaryADL, secondaryADL, tertiaryADL, saveChoiceObject } = this.props;
        const { buttonDisable } = this.state;
            let prevSecondaryObj = {};
            let prevTertiaryObj = {};
            let secondaryChoiceIndex = -1;
            let tertiaryChoiceIndex = -1;
            let newChoiceObjects = _.slice(choiceObjects, 0, choiceObjects.length)
        
            let primarySetKey = _.findKey(displayADL, property => {
                return property.explain === primaryADL.explain
            }) 
            let secondarySetKey = _.findKey(displayADL, property => {
                return property.explain === secondaryADL.explain
            }) 
            let tertiarySetKey = _.findKey(displayADL, property => {
                return property.explain === tertiaryADL.explain
            }) 
        
            let secondaryCheck =_.find(displayADL, property => {
                return property.explain === secondaryADL.explain
            }) 

            let tertiaryCheck = _.find(displayADL, property => {
                return property.explain === tertiaryADL.explain
            }) 

            

            let prevPrimaryObj = _.find(newChoiceObjects, choiceObject => {
        
                return (choiceObject.residentID === selectedResidentID 
                && choiceObject.adlID === currentADLID 
                && choiceObject.choiceSetKey === primarySetKey)
            })
            let adlSaveID = prevPrimaryObj.saveID
            if (secondaryCheck.explain){
                prevSecondaryObj = _.find(newChoiceObjects, choiceObject => {
        
                    return (choiceObject.residentID === selectedResidentID 
                    && choiceObject.adlID === currentADLID 
                    && choiceObject.choiceSetKey === secondarySetKey)
                })
            } else {
                prevSecondaryObj = {
                residentID:null,
                adlChoiceVal: null,
                adlChoiceExplain: null,
                timeStamp: null,
                userID: null,
                choiceSetKey: null,
                ADLSaved:null
                }
            }
            if (tertiaryCheck.explain){
                prevTertiaryObj = _.find(newChoiceObjects, choiceObject => {
        
                    return (choiceObject.residentID === selectedResidentID 
                    && choiceObject.adlID === currentADLID 
                    && choiceObject.choiceSetKey === tertiarySetKey)
                })
            } else {
                prevTertiaryObj = {
                residentID:null,
                adlChoiceVal: null,
                adlChoiceExplain: null,
                timeStamp: null,
                userID: null,
                choiceSetKey: null,
                ADLSaved:null
                }
            }
            
            let primaryObj = Object.assign({},
            {
                residentID:selectedResidentID,
                adlID: currentADLID,
                adlChoiceVal: prevPrimaryObj.adlChoiceVal,
                adlChoiceExplain: prevPrimaryObj.adlChoiceExplain,
                timeStamp: prevPrimaryObj.timeStamp,
                userID: userID,
                choiceSetKey: prevPrimaryObj.choiceSetKey,
                ADLSaved:true,
                saveID: prevPrimaryObj.saveID
            })
            let secondaryObj = Object.assign({},
                {
                    residentID:selectedResidentID,
                    adlID: currentADLID,
                    adlChoiceVal: prevSecondaryObj.adlChoiceVal,
                    adlChoiceExplain: prevSecondaryObj.adlChoiceExplain,
                    timeStamp: prevSecondaryObj.timeStamp,
                    userID: userID,
                    choiceSetKey: prevSecondaryObj.choiceSetKey,
                    ADLSaved:true
                })
            let tertiaryObj = Object.assign({},
            {
                residentID:selectedResidentID,
                adlID: currentADLID,
                adlChoiceVal: prevTertiaryObj.adlChoiceVal,
                adlChoiceExplain: prevTertiaryObj.adlChoiceExplain,
                timeStamp: prevTertiaryObj.timeStamp,
                userID: userID,
                choiceSetKey: prevTertiaryObj.choiceSetKey,
                ADLSaved:true
            })
            
            let adlObj = {
                residentID: selectedResidentID,
                adlID: currentADLID,
                primaryChoice: primaryObj.adlChoiceVal,
                primaryExplain: primaryObj.adlChoiceExplain,
                secondaryChoice: secondaryObj.adlChoiceVal,
                secondaryExplain: secondaryObj.adlChoiceExplain,
                tertiaryChoice: tertiaryObj.adlChoiceVal,
                tertiaryExplain: tertiaryObj.adlChoiceExplain,
                userID: userID,
                timeStamp: primaryObj.timeStamp,
                saveID: primaryObj.saveID
            }
        
        if (adlSaveID){
            axios.patch(`/api/patchadl`, { adlObj }).then( response => {
                let primaryChoiceIndex = newChoiceObjects.indexOf(prevPrimaryObj)
                primaryObj.saveID = response.data[0].id
                newChoiceObjects.splice(primaryChoiceIndex, 1, primaryObj)
            
            if (secondaryCheck.explain){
                secondaryChoiceIndex = newChoiceObjects.indexOf(prevSecondaryObj)
                secondaryObj.saveID = response.data[0].id
                newChoiceObjects.splice(secondaryChoiceIndex, 1, secondaryObj)
                
            }
            if (tertiaryCheck.explain){
                tertiaryChoiceIndex = newChoiceObjects.indexOf(prevTertiaryObj)
                tertiaryObj.saveID = response.data[0].id
                newChoiceObjects.splice(tertiaryChoiceIndex, 1, tertiaryObj)
            }
            
            saveChoiceObject(newChoiceObjects)
            alert('Edit')
            })
        }
        else {
            axios.post(`/api/postadl`, { adlObj }).then( response => {
                console.log(response.data);
                let primaryChoiceIndex = newChoiceObjects.indexOf(prevPrimaryObj)
                primaryObj.saveID = response.data[0].id
                newChoiceObjects.splice(primaryChoiceIndex, 1, primaryObj)
            
            if (secondaryCheck.explain){
                secondaryChoiceIndex = newChoiceObjects.indexOf(prevSecondaryObj)
                secondaryObj.saveID = response.data[0].id
                newChoiceObjects.splice(secondaryChoiceIndex, 1, secondaryObj)
                
            }
            if (tertiaryCheck.explain){
                tertiaryChoiceIndex = newChoiceObjects.indexOf(prevTertiaryObj)
                tertiaryObj.saveID = response.data[0].id
                newChoiceObjects.splice(tertiaryChoiceIndex, 1, tertiaryObj)
            }
            
            saveChoiceObject(newChoiceObjects)
            // alert('Saved')
        
        })
    }
        this.setState({
            buttonDisable:!buttonDisable
        })
    }

    editADL (){
        const { buttonDisable } = this.state;
        this.setState({
            buttonDisable:!buttonDisable
        })
    }
    deleteADL(){
        const { buttonDisable } = this.state;
        const { choiceObjects, currentADLID, selectedResidentID, saveChoiceObject } = this.props;
        this.setState({
            buttonDisable: !buttonDisable
        })
        
        let newChoiceObjects = _.slice(choiceObjects, 0, choiceObjects.length)
        let choiceObject = _.find(newChoiceObjects, choiceObj => {
            return (choiceObj.residentID === selectedResidentID &&
                choiceObj.adlID === currentADLID)
        })
        let deleteID = choiceObject.saveID

        axios.delete('/api/deleteadl', {params: {deleteID:deleteID}}).then( result => {
            alert('Deleted')
        })
        
        let finalChoiceObjects = newChoiceObjects.filter( choiceObj => {
            return choiceObj.saveID !== deleteID
        })
        saveChoiceObject(finalChoiceObjects);

    }
    render(){
    return (
        <div>
            <button disabled={this.state.buttonDisable} onClick = { () => this.saveADL()}>Save ADL</button>
            <button disabled={!this.state.buttonDisable} onClick = { () => this.editADL()}>Edit ADL</button>
            <button disabled={!this.state.buttonDisable} onClick = { () => this.deleteADL()}>Delete ADL</button>
        </div>
    )
    }
}
function mapStateToProps( state ){
    return {
        choiceObjects: state.choiceObjects,
        selectedResidentID: state.selectedResidentID,
        userID: state.userID,
        currentADLID: state.currentADLID
    }
}
export default connect(mapStateToProps, { saveChoiceObject })(withStyles(null)(SaveButton))
