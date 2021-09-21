import React from 'react'
import { NavLink } from "react-router-dom";
function Agenda() {

    return (
        <div>
            <NavLink to="/addAgenda" className="addAgenda">
                <button>addevent</button>
            </NavLink>
        </div>
    )

}

export default Agenda;