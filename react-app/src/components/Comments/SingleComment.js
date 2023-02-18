import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeCommentThunk } from '../../store/comment';
import './SingleComment.css'

function SingleComment({comment}) {
    const dispatch = useDispatch()

    const removeCommentHandleCLick = async (e) => {
        if (window.confirm("Are you sure you want to remove this comment?")) {
            dispatch(removeCommentThunk(comment.id))
        }
    }

    if (!comment.user) return null
    return (
        <div className="single-comment-wrapper">
            <div className="single-comment-container">
                <div className="single-comment-header">
                    <div className="commenter-name">{comment.user.first_name} {comment.user.last_name}</div>
                    <span className="comment-date">{comment.created_at}</span>
                    <div className="delete-comment-button" onClick={removeCommentHandleCLick}>X</div>
                </div>

                <div className="single-comment-content">
                    {comment.content}
                </div>
            </div>
        </div>
    )
}

export default SingleComment
