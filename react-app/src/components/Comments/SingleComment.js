import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SingleComment.css'

function SingleComment() {


    return (
        <div className="single-comment-wrapper">
            <div className="single-comment-container">
                <div className="single-comment-header">
                    <div className="commenter-name">Demo User</div>
                    <span className="comment-date">Today</span>

                    <div className="delete-comment-button">X</div>
                </div>

                <div className="single-comment-content">
                    This is a test comment
                </div>
            </div>
        </div>
    )
}

export default SingleComment
