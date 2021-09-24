import React from "react";
import Calendar from '../components/Calendar/Calendar.js'
import AgendaHeader from '../components/AddAgenda/AgendaHeader.js'

function Home() {

    return (
        <div>
            <AgendaHeader />
            <Calendar />
        </div>
    );

}


export default Home;