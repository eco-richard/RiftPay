import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LeftSideNavigation.css';


function LeftSideNavigation() {
    return (
        <div className="left-side-nav-bar-container">
            <div className='left-side-nav-bar'>
                <div className="dashboard-all-expenses-button-container">
                    <div className="dashboard-link">
                        <NavLink exact to="/dashboard">Dashboard</NavLink>
                    </div>
                    <div className='all-expenses-link'>
                        <NavLink exact to="/all">All Expenses</NavLink>
                    </div>
                </div>
                <div className="friends-list-container">
                    <div className='friends-label'>Friends</div>
                    <div className="individual-friend">
                        <NavLink exact to="/friends/1">Friend 1 - hardcode test</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSideNavigation;
