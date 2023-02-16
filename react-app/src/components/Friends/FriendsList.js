import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadFriendsThunk } from '../../store/friends';

import "./FriendsList.css"

function FriendsList() {

    const dispatch = useDispatch()

    const current_user = useSelector(state => state.session.user)

    const friends = useSelector(state => state.friends.friends)
    // const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const friendsArr = Object.values(friends)
    // console.log("friendsArr", friendsArr)

    useEffect(() => {
        dispatch(loadFriendsThunk())
    },[dispatch, current_user])

    if (Object.keys(friends).length === 0) {
        return null
    }

    return (
        <div className="friends-list-container">
            {friendsArr.map(friend => (
                <div>
                    <NavLink to={`/friends/${friend.id}`} style={{color: "rgb(145, 145, 153)"}}>{`${friend.first_name} ${friend.last_name}`}</NavLink>
                </div>
            ))}
        </div>
    )
}

export default FriendsList;
