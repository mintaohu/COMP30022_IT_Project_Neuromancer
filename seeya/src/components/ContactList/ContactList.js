import React, { useState } from 'react'
import '../../css/contactList.css'
import ContactItem from './ContactItem'
import ContactHeader from './ContactHeader';
import Backdrop from '../Message/Backdrop';
import AddFriend from '../Message/AddFriend';

{/*const contacts = [
    {img:"12345" , name:"peter"}, {img: "09876", name:"ta"}
];*/}

function ContactList(){
    const [option, SetOption] = useState(false);
    const [message, SetMessage] = useState(false);
    const [contacts, setContacts]= useState([]);

    function openOption(){
        SetOption(true);
    }

    function closeOption(){
        SetOption(false);
    }

    function addFriendMessage(){
        SetMessage(true);
    }

    function closeAddFriendMessage(){
        SetMessage(false);
    }

    return(
        <div className="contact_list">
            <div className="contact_list_color"/>
            <ContactHeader />
            {/* get Contact list function */}
            {/* getContactList */}
            <div className="scroll_list">
                {contacts.map(contact => (
                    <ContactItem className="contact_item" img={contact.img} name={contact.name} active={option}/>
                ))}
            </div>
            { option ? null : <button className="New_Friends_button" onClick={addFriendMessage}>Add New Friends</button> }
            {message ? <AddFriend /> : null }
            {message ? <Backdrop onClick={closeAddFriendMessage}/> : null }
            { option ? null : <button className="Manage_Friends_button" onClick={openOption}>Manage Your Friends</button> }
            { option ? <button className="Save_Changes_contacts" onClick={closeOption}>Save Changes</button> : null }
        </div>
    )
}

export default ContactList;