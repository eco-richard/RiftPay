// constants
const ADD_FRIEND = "friends/ADD_FRIEND"
const REMOVE_FRIEND = "friends/REMOVE_FRIEND"
const GET_ALL_FRIENDS = "friends/GET_ALL_FRIENDS"
const GET_SINGLE_FRIEND = "friends/GET_SINGLE_FRIEND"

//action creators
const loadFriends = (friends) => {
    return {
        type: GET_ALL_FRIENDS,
        friends
    }
}
const loadSingleFriend = (friend) => {
    return {
        type: GET_SINGLE_FRIEND,
        friend: friend["Single_Friend"]
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
    if (response.ok) {
        const friends = await response.json()
        dispatch(loadFriends(friends))
        return friends
    }
}

export const loadSingleFriendThunk = (friendId) => async dispatch => {
    const response = await fetch(`/api/friends/${friendId}`)
    if (response.ok) {
        const friend = await response.json()
        dispatch(loadSingleFriend(friend))
        return friend
    }
}

export const removeFriendThunk = (friendId) => async dispatch => {
    const response = await fetch(`/api/friends/${friendId}`,{
        method: "DELETE",
        header: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        const badFriend =  await response.json()
        dispatch(removeFriend(badFriend))
        return badFriend
    }
}


const initialState = {
    friends: {},
    singleFriend: {}
}

const friends = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FRIENDS: {
            const newState = { friends: {}, singleFriend: {} }
            let normalizedFriends = {}
            action.friends.user_friends.forEach((friend) => {
                let friendObj = {}
                friend.forEach(() => {
                    friendObj.id = friend[2]
                    friendObj.first_name = friend[0]
                    friendObj.last_name = friend[1]
                    normalizedFriends[friend[2]] = friendObj
                })
            })
            newState.friends = normalizedFriends
            return newState
        }
        case GET_SINGLE_FRIEND: {
            const newState = { friends: {...state.friends}, singleFriend: {} }
            newState.singleFriend = action.friend
            return newState
        }
        case REMOVE_FRIEND: {
            const newState = {...state}
            newState.singleFriend = {}
            delete newState.friends[action.friendId]
            return newState
        }
        default:
            return state;
    }
}

export default friends
