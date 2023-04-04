import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadFriendsThunk } from '../../store/friends';
import FriendsList from '../Friends/FriendsList';
import './LeftSideNavigation.css';


function LeftSideNavigation() {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends.friends);

    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [dispatch])

    if (!friends) {
        return null
    }

    return (
        <div className='left-side-nav-bar-container'>
            <div className="dashboard-all-expenses-links-container">
                <div id="dashboard-link-container" className="left-nav-link-container">
                    <NavLink exact to="/dashboard" className="left-navbar-link" activeClassName="left-navbar-link-active">Dashboard</NavLink>
                </div>
                <div id='all-expenses-link-container' className="left-nav-link-container">
                    <NavLink exact to="/all" className="left-navbar-link" activeClassName="left-navbar-link-active">All Expenses</NavLink>
                </div>
            </div>
            <div style={{ height: "20px" }}></div>
            <FriendsList friends={friends}/>
        </div>
    )
}

export default LeftSideNavigation;
