import React, { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCommentsThunk, clearComments } from "../../store/comment";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";
import './AllComments.css'

function AllComments({transaction_id}) {

    const dispatch = useDispatch()

    const comments = useSelector(state => state.comments.allCommentsByTransactionId[transaction_id])

    useEffect(() => {
        dispatch(loadCommentsThunk(transaction_id));
        // return () => dispatch(clearComments())
    },[dispatch, transaction_id])

    if (!comments) {
        return null;
    }

    // const allComments = comments.allCommentsByTransactionId

    // if (!allComments) {
    //     return null;
    // }

    // if (!allComments[transaction_id]) {
    //     return null;
    // }

    const commentsArr = Object.values(comments)
    // console.log(allComments)
    // const commentsArr = Object.values(allComments)
    // console.log("commentsArr", commentsArr)
    // const finalCommentsArr = commentsArr[0]
    // console.log(finalCommentsArr)

    return (
        <div className="all-comments-wrapper">
            <div className="all-comments-header">
            <i class="fa-solid fa-book"></i> Notes and Comments
            </div>
            <div className="single-comment-container">
                <div className="single-comment-content">
                    {Object.values(commentsArr).map(comment => (
                        <SingleComment comment={comment} />
                    ))}
                </div>
            </div>
            <div className="comment-submission-container">
                <AddComment transaction_id={transaction_id}/>
            </div>
        </div>
    )
}

export default AllComments
