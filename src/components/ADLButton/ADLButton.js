import React, {Component} from 'react';

export default function ADLButton (props){
    const {ADLName, ADLSchemaID, handleClickFn} = props;
    return (
        <button onClick = { () => handleClickFn( ADLSchemaID ) }> { ADLName } </button>
    )
}