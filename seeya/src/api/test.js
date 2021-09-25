import { useState, useEffect } from "react";

const BASE_URL = "https://seeya-neuromancer.herokuapp.com"

function getUserEmail() {

    // get vendor's name
    let userName = "Miro";

    // URL + Route
    const endpoint = BASE_URL + "/";

    // send Post Request to allocate the customer's collection
    let postReq = fetch(endpoint, {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(userName)
    })

    // return the response json from backend
    return postReq.then(res => res.json());
}

function useUserEmail() {

    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUserEmail().then(
            email => {
                setEmail(email);
                setLoading(false);
            }).catch(
                e => {
                    console.log(e);
                    setError(e);
                    setLoading(false);
                });
    }, []);

    return {
        loading,
        email,
        error
    };

}
export { useUserEmail }