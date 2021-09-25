import React from "react";
import Calendar from '../components/Calendar/Calendar.js'
import AgendaHeader from '../components/AddAgenda/AgendaHeader.js'
import ContactList from '../components/ContactList/ContactList.js'

function Home() {

    return (
        <div>
            <AgendaHeader />
            <Calendar />
            <ContactList />
        </div>
    );

}


export default Home;