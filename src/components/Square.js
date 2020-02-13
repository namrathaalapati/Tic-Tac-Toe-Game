import React from 'react';

export default function Square(props){
    return(
    <button className="square btn btn-info btn-outline-light text-dark " onClick={props.onClick}>
        {props.value}
    </button>
    )
}