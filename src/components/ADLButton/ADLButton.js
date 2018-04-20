import React, {Component} from 'react';

export default function ADLButton (props){
    const {name, id, handleClickFn} = props;
    return (
        <button onClick = { () => handleClickFn( id ) }> { name } </button>
    )
}