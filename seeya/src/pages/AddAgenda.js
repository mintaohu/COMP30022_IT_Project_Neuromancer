import React from "react";
import AgendaHeader from '../components/AddAgenda/AgendaHeader.js'
import AddEvent from '../components/AddAgenda/AddEvents.js'
import "../css/newEvent.css";

function AddAgenda() {

    return (
        <div>
            <AgendaHeader />
            <AddEvent />
        </div>
    );

}


export default AddAgenda;