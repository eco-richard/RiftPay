
const GET_TRANSACTIONS = "transaction/GET_TRANSACTIONS"
const GET_SINGLE_TRANSACTION = "transaction/GET_SINGLE_TRANSACTION"
const GET_FRIEND_TRANSACTIONS = "transaction/GET_FRIEND_TRANSACTIONS"
const ADD_TRANSACTION = "transaction/ADD_TRANSACTION"
const UPDATE_TRANSACTION = "transaction/UPDATE_TRANSACTION"
const DELETE_TRANSACTION = "transaction/DELETE_TRANSACTION"

const getAll = (transactions) => ({
    type: GET_TRANSACTIONS,
    transactions
})

const getSingle = (transaction) => ({
    type: GET_SINGLE_TRANSACTION,
    transaction
})

const getFriend = (transactions) => ({
    type: GET_FRIEND_TRANSACTIONS,
    transactions
})

const add = (transaction) => ({
    type: ADD_TRANSACTION,
    transaction
})

const update = (transaction) => ({
    type: UPDATE_TRANSACTION,
    transaction
})

const remove = (transaction) => ({
    type: DELETE_TRANSACTION,
    transaction
})

export function getAllTransactions() {
    return async (dispatch) => {
        const response = await fetch('/api/transactions/current');
        
        if (response.ok) {
            const transactions = await response.json();
            dispatch(getAll(transactions))
        }
    }
}

export function getSingleTransaction(transactionId) {
    return async (dispatch) => {
        const response = await fetch(`/api/transactions/${transactionId}`)

        if (response.ok) {
            const transaction = await response.json();
            dispatch(getSingle(transaction))
        }
    }
}

export function getFriendTransactions(friendId) {
    return async (dispatch) => {
        const response = await fetch(`/api/transactions/friend/${friendId}`)

        if (response.ok) {
            const transactions = await response.json();
            dispatch(getFriend(transactions))
        }
    }
}

export function createTransaction(transaction) {
    return async (dispatch) => {
        const response = await fetch('/api/transactions', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(transaction)
        });

        if (response.ok) {
            const transaction = await response.json();
            dispatch(add(transaction))
        }
    }
}

export function updateTransaction(transactionId, transaction) {
    return async (dispatch) => {
        const response = await fetch(`/api/transactions/${transactionId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(transaction)
        });

        if (response.ok) {
            const transaction = response.json();
            dispatch(update(transaction))
        }
    }
}

export function deleteTransaction(transaction) {
    return async (dispatch) => {
        const response = await fetch(`/api/transaction/${transaction.id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const message = response.json()
            dispatch(remove(transaction.id))
            return message;
        }
    }
}

const initialState = {allTransactions: {}, singleTransaction: {}}
export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_TRANSACTIONS:
            newState = {allTransactions: {}, singleTransaction: {}}
            action.transactions.Transactions.forEach(transaction => {
                newState.allTransactions[transaction.id] = transaction
            })
            return newState;
        case GET_SINGLE_TRANSACTION:
            newState = {...state, singleTransaction: {}}
            newState.singleTransaction = action.transaction;
            return newState;
        case GET_FRIEND_TRANSACTIONS:
            newState = {...state, allTransactions: {}}
            action.transactions.Transactions.forEach(transaction => {
                newState.allTransactions[transaction.id] = transaction
            })
            return newState;
        case ADD_TRANSACTION:
            newState = {...state, allTransactions: {...state.allTransactions}}
            newState.allTransactions[action.transaction.id] = action.transaction
            return newState;
        case UPDATE_TRANSACTION:
            newState = {...state, allTransactions: {...state.allTransactions}, singleTransaction: {}}
            newState.allTransactions[action.transaction.id] = action.transaction
            newState.singleTransaction = action.transaction;
            return newState;
        case DELETE_TRANSACTION:
            newState = {...state, allTransactions: {...state.allTransactions}, singleTransaction: {}}
            delete newState.allTransactions[action.transaction.id]
            return newState;
        default:
            return state;
    }
}