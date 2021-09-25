import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import '../../css/calender.css'
import '../../css/viewAgenda.css'
import minus from "../../images/remove.png"
import edit from "../../images/draw.png"
import Backdrop from '../Message/Backdrop';
import EventDetails from '../Message/EventDetails';

{/*import { onEventAdded, handleEventAdd } from "../../../api/calender.js";*/}
const dummy = [{
    start:"2021-09-09", icon:"👜", title:"hello", when:"09-09-10-09", address:"here 4234 gf gr wf f w w e wegg q qgq ewwg gw wg wg w ef w fwf ", details:" not here"
},{
    icon:"🎮", when:"09-09-09-09", title:"bye", start:"2021-09-09", address:"there", details:" not there"
}]
function Calender() {
    const [events, setEvents]= useState([]);
    const [info, setInfo] = useState("");
    const [date, setDate] = useState("");
    const [active, setActive] = useState(false);
    const [detailIsOpen, setDetailIsOpen] = useState(false);
    const [address, setAddress]= useState("");
    const [details, setDetails] = useState("");

    function handleshow() {
        if(active === true){
            setActive(false);
        }
        else{
            setActive(true);
        }
    }

    /* display event info when click */
    function renderEvent(eventInfo) {
        setInfo(eventInfo.event.title);
        setDate(eventInfo.event.extendedProps.when)
        setAddress(eventInfo.event.extendedProps.address)
        setDetails(eventInfo.event.extendedProps.details)
    }

    function renderEventContent(eventInfo) {
        return (
          <div>
            {eventInfo.event.extendedProps.icon}
          </div>
        )
    }

    function detailsMessageHandler(){
        setDetailIsOpen(true);
    }

    function closeDetailsMessageHandler(){
        setDetailIsOpen(false);
    }

    return (
        <section>
            <div className="calender_color" />
            <div className="calender_case">
                <div className="calender"style={{position:"relative", zIndex:0}}>
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        events={events}
                        eventContent= {renderEventContent}
                        /* after implement form to add event then dont need to create event function */
                        /* (async function to create event)
                        eventAdd={event=>handleEventAdd(event)}
                        (get event from database)
                        datesSet={date=>handleDatesSet(date)}
                        */
                        eventClick={renderEvent}
                        headerToolbar={{start: 'prev', center: 'title', end: 'next'}}
                    />
                </div>
            </div>
            <div className="recent_agenda_color" />
            <div className="recent_agenda">
                <div className="agenda_header">
                    <p>Recent Agenda</p>
                    <hr className="recent_agenda_header"/>
                </div>
                <div className="agenda_content">
                    <p className="content" onClick={detailsMessageHandler}>{date}</p>
                    <p className="content" onClick={detailsMessageHandler}style={{marginTop: '5%'}}>{info}</p>
                    { active ? <img src={minus} className="minus_icon" alt="Minus"></img> : null }
                    { active ? <img src={edit} className="draw_icon" alt="Edit"></img> : null }
                    {detailIsOpen ? <EventDetails address={address} details={details}/> : null }
                    {detailIsOpen ? <Backdrop onClick={closeDetailsMessageHandler}/> : null }
                </div>
                { active ? null : <NavLink to="/addAgenda" className="addAgenda">
                    <button className="recent_agenda_button">Add New Agenda</button>
                </NavLink> }
                { active ? null : <button className="manage_agenda_button" onClick={handleshow} disabled={!info}>Manage Agenda</button> }
                { active ? <button className="save_changes" onClick={handleshow}>Save Changes</button> : null }
            </div>
        </section>
        
    );

}


export default Calender;