import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./AddComment.css"

function AddComment() {
    const [comment, setComment] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [updatedAt, setUpdatedAt] = useState("")
    //dates should be month/day/year 02/17/2023 format
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.length || review.length > 500) {
            window.alert("Please enter a valid review less than 500 characters.")
        }

        const today = new Date()
        const year = today.getUTCFullYear()
        const month = today.getUTCMonth() + 1
        const day = today.getUTCDate()
        setCreatedAt(`${month}/${day}/${year}`)
        setUpdatedAt(`${month}/${day}/${year}`)
        // dispatch create commment thunk

    }

    return (
        <div className="add-comment-wrapper">
            <div className="add-comment-content-container">
                <form className="add-comment-form" onSubmit={handleSubmit}>
                    <div className="add-comment-form-input-wrapper">
                        <label className="comment-text-field">
                            <textarea
                                type="text"
                                value={comment}
                                placeholder="Add a comment"
                                onChange={(e) => setComment(e.target.value)}/>
                        </label>
                    </div>
                </form>
            </div>

            <button className="add-comment-submit-button">
                Submit
            </button>
        </div>
    )
}

export default AddComment
