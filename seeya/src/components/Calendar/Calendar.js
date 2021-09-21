import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import '../../css/calender.css'
{/*import { onEventAdded, handleEventAdd } from "../../../api/calender.js";*/}

function Calender() {
    const [events, setEvents]= useState([]);
    const [info, setInfo] = useState([]);

    /* display event info when click */
    function renderEventContent(eventInfo) {
        setInfo(eventInfo.event.title);
    }
      
    return (
        <section>
            <div className="calender_case">
                <div className="calender"style={{position:"relative", zIndex:0}}>
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        events={events}
                        /* after implement form to add event then dont need to create event function */
                        /* (async function to create event)
                        eventAdd={event=>handleEventAdd(event)}
                        (get event from database)
                        datesSet={date=>handleDatesSet(date)}
                        */
                        eventClick={renderEventContent}
                        headerToolbar={{start: 'prev', center: 'title', end: 'next'}}
                    />
                </div>
            </div>
            {info}
        </section>
        
    );

}


export default Calender;