import React, { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCommentsThunk, clearComments } from "../../store/comment";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";
import './AllComments.css'

function AllComments({ transaction_id, transactionNote }) {

    const dispatch = useDispatch()

    const comments = useSelector(state => state.comments.allCommentsByTransactionId[transaction_id])

    useEffect(() => {
        dispatch(loadCommentsThunk(transaction_id));
    }, [dispatch, transaction_id])

    if (!comments) {
        return null;
    }

    const commentsArr = Object.values(comments)

    return (
        <div className="all-comments-wrapper">
            <div className="all-comments-header">
                <i class="fa-solid fa-book"></i> <span style={{fontSize: "1em"}}>Notes and Comments</span>
            </div>
            <div className="transaction-note-container">
                {transactionNote && (
                    <div className="note-container">
                        <div className="note-header">
                            Note
                        </div>
                        <div className="note-content">
                            {transactionNote}
                        </div>
                    </div>
                )}
            </div>
            <div className="single-comment-container">
                <div className="single-comment-content">
                    {Object.values(commentsArr).map(comment => (
                        <SingleComment comment={comment} />
                    ))}
                </div>
            </div>
            <div className="comment-submission-container">
                <AddComment transaction_id={transaction_id} />
            </div>
        </div>
    )
}

export default AllComments
