
const GET_BALANCES = "balance/GET_BALANCES";
const GET_FRIEND_BALANCE = "balance/GET_FRIEND_BALANCE"
const UPDATE_BALANCE = "balance/UPDATE_BALANCE"

const get = (owe, owed, friends) => ({
  type: GET_BALANCES,
  owe,
  owed,
  friends
})

const getFriend = (friend) => ({
  type: GET_FRIEND_BALANCE,
  friend
})

const update = (balance) => ({
  type: UPDATE_BALANCE,
  balance
})

export function getBalances() {
  return async (dispatch) => {
    const response = await fetch('/api/balances/total');

    if (response.ok) {
      const friendsResponse = await response.json();
      const friends = friendsResponse.friends;
      let owedBalance = 0;
      let oweBalance = 0;
      for (const friend of friends) {
        if (friend.balance < 0) {
          oweBalance += Math.abs(friend.balance);
        } else {
          owedBalance += friend.balance;
        }
      }
      dispatch(get(oweBalance, owedBalance, friends))
    }
  }
}

export function getFriendBalance(friendId) {
  return async (dispatch) => {
    const response = await fetch(`/api/balances/friend/${friendId}`)

    if (response.ok) {
      const friend = await response.json();
      dispatch(getFriend(friend))
    }
  }
}

export function updateFriendBalance(transaction, friendId) {
  return async (dispatch) => {
    const response = await fetch(`/api/balances/friend/${friendId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(transaction)
    })

    if (response.ok) {
      const _ = await response.json();
      getFriendBalance(friendId)
    }
  }
}

const initialState = {owed: 0, owes: 0, friends: {}};
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_BALANCES:
      newState = {...state};
      newState.owed = action.owed;
      newState.owes = action.owe;
      action.friends.forEach(friend => {
        newState.friends[friend.id] = friend;
      })
      return newState;
    case GET_FRIEND_BALANCE:
      newState = {...state, friend: {}}
      newState.friend = action.friend;
      return newState;
    default:
      return state;
  }
}
