import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-date-picker';
import { NavLink } from "react-router-dom";
import backArrow from '../../images/yanni/arrow-left.svg'

const Button = styled.button
    `background-color: white;
    color: black;
    cursor: pointer;
    &:disabled {
        cursor: default;
    }`;

const ButtonToggle = styled(Button)
    `${({ active }) => active && `color: white; background-color: black`}`;

const ButtonGroup = styled.div
`display: flex;`;

const privacies = ["Public", "Private"];
const activity_types = ["❤", "👜", "🕮", "🏃‍♀️", "🎮", "🦮"];

function AddEvents({isOpen, onClose, onEventAdded}) {
    const [what, setWhat] = useState("");
    const [start, setStart] = useState(new Date());
    const [where, setWhere] = useState("");
    const [who, setWho] = useState("");
    const [details, setDetails] = useState("");
    const [active, setActive] = useState(privacies[0]);
    const [activity, setActivity] = useState(activity_types[0]);

    return (
        <div className="Add_event">
            <NavLink style={{textDecoration: 'none' }} to="/" className="Login_back">
                <img src = {backArrow} alt = "back arrow" className = "backArrow"></img>
                <p className="back_word"> Back</p>
            </NavLink>
            <div className="agenda_background_div" />
            {/*TODO: Check what, when, where, active, activity, details*/}
            <form onSubmit={ { } }>
                <div className="Agenda_form">
                    <div className="newagenda_tag">
                        <p className="newagenda_nametag">Add New Agenda</p>
                    </div>
                    <div className="general_title">
                        <label htmlFor="what">What</label>
                    </div>
                    <div className="agenda_input">
                        <input
                            className="what_form"
                            type="text"
                            name="what"
                            id="what"
                            value={what}
                            onChange={(event) => {
                                setWhat(event.target.value);
                            }}
                            required=""
                        />
                    </div>
                
                    <div className="general_title">
                        <label htmlFor="start">When</label>
                    </div>
                    <DatePicker
                            className="date_form"
                            dateFormat="YYYY-MM-DD"
                            timeFormat={false}
                            value={start}
                            onChange={date => setStart(date)}
                        />
                    <div className="general_title">
                        <label htmlFor="where">Where</label>
                    </div>
                    <div className="agenda_input">
                        <input
                            className="what_form"
                            type="text"
                            name="where"
                            id="where"
                            value={where}
                            onChange={(event) => {
                                setWhere(event.target.value);
                            }}
                            required=""
                        />
                    </div>

                    <div className="general_title">
                        <label htmlFor="who">Who</label>
                    </div>
                    <div className="agenda_input">
                        <input
                            className="what_form"
                            type="text"
                            name="who"
                            id="who"
                            value={who}
                            onChange={(event) => {
                                setWho(event.target.value);
                            }}
                            required=""
                        />
                    </div>

                    <div className="general_title">
                        <label htmlFor="choose_type">Choose Type</label>
                    </div>
                    <ButtonGroup>
                        {privacies.map(privacy => (
                            <ButtonToggle
                                className="privacybutton"
                                type="button"
                                key={privacy}
                                active={active === privacy}
                                onClick={() => setActive(privacy)}
                            >
                                {privacy}
                            </ButtonToggle>
                        ))}
                    </ButtonGroup>

                    <div className="general_title">
                        <label htmlFor="choose_icon">Choose Icon</label>
                    </div>
                    <ButtonGroup>
                        {activity_types.map(type => (
                            <ButtonToggle
                                className="iconbutton"
                                type="button"
                                key={type}
                                active={activity === type}
                                onClick={() => setActivity(type)}
                            >
                                {type}
                            </ButtonToggle>
                        ))}
                    </ButtonGroup>

                    <div className="general_title">
                        <label htmlFor="details">Details</label>
                    </div>
                    <div className="agenda_input">
                        <textarea
                            className="details_form"
                            multiline={true}
                            type="text"
                            name="details"
                            id="details"
                            value={details}
                            onChange={(event) => {
                                setDetails(event.target.value);
                            }}
                            required=""
                        />
                    </div>

                    <input className="agenda_confirm"
                        type="submit"
                        value="Confirm"
                        id="button"
                    />
                </div>
            </form>
        </div>
    )

}

export default AddEvents;