import React, { useState, useEffect } from "react";
import { getUser } from "../modules/userProfileManager";

function Home() {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        getUser().then((user) => setCurrentUser(user))
    }, [])

    if (currentUser.id == null) {
        return (
            <h2>Logging In...</h2>
        )
    } else {
        return (
            <h1>Welcome, {currentUser.name}!</h1>
        )
    }
}

export default Home