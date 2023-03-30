// constant
const ADD_COMMENT = "comments/ADD_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS"
const UPDATE_COMMENT = "comments/UPDATE_COMMENT"
const CLEAR_COMMENTS = "reviews/CLEAR_COMMENTS"

// action creators
const loadComments = (comments, transaction_id) => {
    return {
        type: GET_ALL_COMMENTS,
        comments,
        transaction_id
    }
}

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

const removeComment = (comment) => {
    return {
        type: REMOVE_COMMENT,
        comment
    }
}

export const clearComments = () => {
    return {
      type: CLEAR_COMMENTS
    }
  }

// thunks
export const loadCommentsThunk = (transaction_id) => async dispatch => {
    const response = await fetch(`/api/comments/${transaction_id}`)
    if (response.ok) {
        const comments = await response.json()
        dispatch(loadComments(comments, transaction_id))
        return comments
    }
}

export const addCommentThunk = (comment, transaction_id) => async dispatch => {
    const response = await fetch(`/api/comments/${transaction_id}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
    })
    if (response.ok){
        const newComment = await response.json()
        dispatch(addComment(newComment))
        return newComment
    }
}

export const updateCommentThunk = (comment, comment_id) => async dispatch => {
    const response = await fetch (`/api/comments/${comment_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const updatedComment = await response.json()
        dispatch(updateComment(updatedComment))
        return updatedComment
    }
}

export const removeCommentThunk = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        const badComment = await response.json()
        dispatch(removeComment(comment))
        return badComment
    }
}

const initialState = {
    allCommentsByTransactionId: {},
    singleComment: {}
}

const comments = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALL_COMMENTS: {
            let normalizedTransactions = {...state.allCommentsByTransactionId}
            let normalizedComments = {}
            action.comments.comments.forEach((comment) => {
                normalizedComments[comment.id] = comment
                // newState.allCommentsByTransactionId[comment.id] = comment
            })
            normalizedTransactions[action.transaction_id] = normalizedComments
            newState.allCommentsByTransactionId = normalizedTransactions
            return newState
        }
        case ADD_COMMENT: {
            const transactionId = action.comment.transaction_id
            const commentId = action.comment.id
            newState.allCommentsByTransactionId = {...state.allCommentsByTransactionId}
            newState.allCommentsByTransactionId[transactionId] = {...state.allCommentsByTransactionId[transactionId]}
            newState.allCommentsByTransactionId[transactionId][commentId] = action.comment
            return newState
        }
        case REMOVE_COMMENT: {
            const transactionId = action.comment.transaction_id
            const commentId = action.comment.id
            newState.allCommentsByTransactionId = {...state.allCommentsByTransactionId}
            newState.allCommentsByTransactionId[transactionId] = {...state.allCommentsByTransactionId[transactionId]}
            delete newState.allCommentsByTransactionId[action.comment.transaction_id][action.comment.id]
            return newState
        }
        case UPDATE_COMMENT: {
            const transactionId = action.comment.transaction_id
            const commentId = action.comment.id
            newState.allCommentsByTransactionId = {...state.allCommentsByTransactionId}
            newState.singleComment = action.comment
            // newState.allCommentsByTransactionId[transactionId] = {...state.allCommentsByTransactionId[transactionId]}
            newState.allCommentsByTransactionId[transactionId][commentId] = action.comment
            newState.singleComment = action.comment
            return newState
        }
        case CLEAR_COMMENTS: {
            newState = {...state}
            newState.allCommentsByTransactionId = {}
            return newState
        }
        default:
            return state;
    }
}

export default comments
