// constant
const ADD_COMMENT = "comments/ADD_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_FRIEND"
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS"
const UPDATE_COMMENT = "comments/UPDATE_COMMENT"
const CLEAR_REVIEWS = "reviews/clearReviews"

// action creators
const loadComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments
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
      type: CLEAR_REVIEWS
    }
  }

// thunks
export const loadCommentsThunk = (transaction_id) => async dispatch => {
    const response = await fetch(`/api/comments/${transaction_id}`)
    if (response.ok) {
        const comments = await response.json()
        dispatch(loadComments(comments))
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
        console.log("newComment in thunk", newComment)
        dispatch(addComment(newComment))
        return newComment
    }
}

export const updateCommentThunk = () => async dispatch => {

}

export const removeCommentThunk = () => async dispatch => {

}

const initialState = {}

const comments = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALL_COMMENTS: {
            let normalizedComments = {}
            action.comments.comments.forEach((comment) => {
                normalizedComments[comment.id] = comment
            })
            newState.allComments = normalizedComments
            return newState
        }
        case ADD_COMMENT: {
            newState.allComments = {...state.allComments}
            newState.allComments[action.comment.id] = action.comment
            return newState
        }
        case REMOVE_COMMENT: {

        }
        case UPDATE_COMMENT: {

        }
        case CLEAR_REVIEWS: {
            newState = {...state}
            newState.allComments = {}
            return newState
        }
        default:
            return state;
    }
}

export default comments
