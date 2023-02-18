import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SingleComment.css'

function SingleComment({comment}) {

    if (!comment) return null
    return (
        <div className="single-comment-wrapper">
            <div className="single-comment-container">
                <div className="single-comment-header">
                    <div className="commenter-name">{comment.commentor_id}</div>
                    <span className="comment-date">{comment.created_at}</span>
                    <div className="delete-comment-button">X</div>
                </div>

                <div className="single-comment-content">
                    {comment.content}
                </div>
            </div>
        </div>
    )
}

export default SingleComment
