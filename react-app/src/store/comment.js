// constant
const ADD_COMMENT = "comments/ADD_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_FRIEND"
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS"
const UPDATE_COMMENT = "comments/UPDATE_COMMENT"

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

// thunks
export const loadCommentsThunk = () => async dispatch => {

}

export const addCommentThunk = () => async dispatch => {

}

export const updateCommentThunk = () => async dispatch => {

}

export const removeCommentThunk = () => async dispatch => {

}

const initialState = {}

const comments = (state = initialState, action) => {
    switch (action.type) {


        default:
            return state;
    }
}

export default comments
