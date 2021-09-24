import React from 'react';
import '../../css/message.css'

function EventDetails(props){
    return(
        <div className="details_message">
            <p>Address: {props.address}</p>
            <p>Details: {props.details}</p>
            <p>Share to...</p>
        </div>
    )
}

export default EventDetails;