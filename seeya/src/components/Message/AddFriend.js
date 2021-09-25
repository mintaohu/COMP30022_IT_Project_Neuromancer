import React, { useState } from 'react'
import '../../css/message.css'

function AddFriendMessage(){
    const [friendEmail, setFriendEmail] = useState("");

    return(
        <form className="addFriend" onSubmit={ { } }>
            <div className="addFriend_title">
                <label htmlFor="FriendEmail">Input new friend's email here...</label>
            </div>
            <div>
                <input
                    className="addFriend_input"
                    type="text"
                    name="FriendEmail"
                    id="FriendEmail"
                    value={friendEmail}
                    onChange={(event) => {
                        setFriendEmail(event.target.value);
                    }}
                />
            </div>
            <input className="addfriend_confirm"
                type="submit"
                value="Confirm"
                id="button"
            />
        </form>
    )
}

export default AddFriendMessage;