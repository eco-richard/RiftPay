import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SplashPage() {

    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/dashboard" />;

    return (
        <div>
            <h1>
                THIS IS WHERE THE SPLASH PAGE GOES
            </h1>
        </div>
    )
}

export default SplashPage;
