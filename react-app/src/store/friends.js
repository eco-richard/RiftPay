// constants
const ADD_FRIEND = "friends/ADD_FRIEND"
const REMOVE_FRIEND = "friends/REMOVE_FRIEND"
const GET_ALL_FRIENDS = "friends/GET_ALL_FRIENDS"

//action creators
const loadFriends = (friends) => {
    return {
        type: GET_ALL_FRIENDS,
        friends
    }
}

const addFriend = (friendId) => {
    return {
        type: ADD_FRIEND,
        friendId
    }
}

const removeFriend = (friendId) => {
    return {
        type: REMOVE_FRIEND,
        friendId
    }
}

//thunks

// export const addFriendThunk = (friendId) => async dispatch => {
//     const response = await fetch("/api/friends/", {
//         method: "POST",
//         headers: {
// 			"Content-Type": "application/json",
// 		},
//     })
// }

export const loadFriendsThunk = () => async dispatch => {
    const response = await fetch("/api/friends/")
    console.log("response", response)
    if (response.ok) {
        const friends = await response.json()
        dispatch(loadFriends(friends))
        return friends
    }
}

const initialState = {
    friends: {}
}

const friends = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FRIENDS: {
            const newState = { friends: {} }
            newState.friends = action.friends.user_friends
            return newState
        }
        default:
            return state;
    }
}

export default friends
