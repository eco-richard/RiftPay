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
const addFriend = (friend) => {
    return {
        type: ADD_FRIEND,
        friend: friend['New_Friend']
    }
}

const removeFriend = (friendId) => {
    return {
        type: REMOVE_FRIEND,
        friendId
    }
}

//thunks


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
        dispatch(removeFriend(friendId))
        return badFriend
    }
}
export const addFriendThunk = (email) => async dispatch => {
    const response = await fetch(`/api/friends`,{
        method: "POST",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify(email)
    })
    if (response.ok) {
        const newFriend =  await response.json()
        dispatch(addFriend(newFriend))
        return newFriend
    }
}


const initialState = {
    friends: {},
    singleFriend: {}
}

const friends = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FRIENDS: {
            const newState = { friends: {...state.friends}, singleFriend: {...state.singleFriend} }
            let normalizedFriends = {}
            action.friends.user_friends.forEach((friend) => {
                normalizedFriends[friend.id] = friend
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
        case ADD_FRIEND: {
            const newState = {...state, friends: {...state.friends}, singleFriend: {...state.singleFriend}}
            newState.friends[action.friend.id] = action.friend
        }
        default:
            return state;
    }
}

export default friends
