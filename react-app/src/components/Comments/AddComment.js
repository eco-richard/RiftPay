import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./AddComment.css"

function AddComment() {
    const [comment, setComment] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const errorsArr = [];
        if (!comment.length || review.length > 500) {
            window.alert("Please enter a valid review less than 500 characters.")
        }

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
