import React, { useState } from 'react'
import '../../css/contactList.css'
import minus from "../../images/remove.png"
import edit from "../../images/draw.png"

function ContactItem(props){
    return(
        <div>
            <img src={props.img} className="contact_img" />
            <p className="contact_content">{props.name}</p>
            <div className="options" onClick={props.onClick}>
                { props.active ? <img src={minus} className="minus_icon_contact" alt="Minus"></img> : null }
                { props.active ? <img src={edit} className="draw_icon_contact" alt="Edit"></img> : null }
            </div>
        </div>
    )
}

export default ContactItem;