import React from 'react';
import '../../css/message.css'

function Backdrop(props){
    return(
        <div className="backdrop" onClick={props.onClick} />
    )
}

export default Backdrop;