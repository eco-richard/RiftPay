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
                <div className="dashboard-link-container">
                    <NavLink exact to="/dashboard" style={{ color: "rgb(145, 145, 153)" }}>Dashboard</NavLink>
                </div>
                <div className='all-expenses-link-container'>
                    <NavLink exact to="/all" style={{ color: "rgb(145, 145, 153)" }}>All Expenses</NavLink>
                </div>
            </div>
            <div style={{ height: "20px" }}></div>
            <div className="individual-friend">
                <FriendsList friends={friends}/>
            </div>
        </div>
    )
}

export default LeftSideNavigation;
