import React from "react";
import Calendar from '../components/Calendar/Calendar.js'
import Agenda from '../components/Agenda/Agenda.js'
import AgendaHeader from '../components/AddAgenda/AgendaHeader.js'

function Home() {

    return (
        <div>
            <AgendaHeader />
            <Agenda />
            <Calendar />
        </div>
    );

}


export default Home;