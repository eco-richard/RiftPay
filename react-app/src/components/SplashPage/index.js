import React from 'react';
import { NavLink, Redirect,useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SplashPage() {
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) {
        history.push("/dashboard")
    }

    return (
        <div>
            <h1>
                THIS IS WHERE THE SPLASH PAGE GOES
            </h1>
        </div>
    )
}

export default SplashPage;
