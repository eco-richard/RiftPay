import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FriendsList from '../Friends/FriendsList';
import './LeftSideNavigation.css';


function LeftSideNavigation() {
    return (
        <div className='left-side-nav-bar-container'>
            <div className="dashboard-all-expenses-links-container">
                <div className="dashboard-link-container">
                    <NavLink exact to="/dashboard"  style={{color: "rgb(145, 145, 153)"}}>Dashboard</NavLink>
                </div>
                <div className='all-expenses-link-container'>
                    <NavLink exact to="/all" style={{color: "rgb(145, 145, 153)"}}>All Expenses</NavLink>
                </div>
            </div>
            <div style={{height: "20px"}}></div>
            <div className="friends-list-container">
                <div className='friends-label'>FRIENDS</div>
                <div className="individual-friend">
                    <FriendsList />
                </div>
            </div>
        </div>
    )
}

export default LeftSideNavigation;

