import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCommentThunk, loadCommentsThunk } from "../../store/comment";
import "./AddComment.css";

function AddComment({ transaction_id }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    //dates should be month/day/year 02/17/2023 format
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.length || content.length > 500) {
            window.alert(
                "Please enter a valid comment that is less than 500 characters."
            );
        }

        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth() + 1;
        const day = today.getUTCDate();
        const date = `${month}/${day}/${year}`;
        // setCreatedAt(date)
        // setUpdatedAt(date)
        const comment = {
            content,
            transaction_id,
            commentor_id: user.id,
            created_at: date,
            updated_at: date,
        };
        console.log("comment in add comment form", comment);
        return dispatch(addCommentThunk(comment, transaction_id)).then(() => {dispatch(loadCommentsThunk(transaction_id))})
    };

    return (
        <div className="add-comment-wrapper">
            <div className="add-comment-content-container">
                <form className="add-comment-form" onSubmit={handleSubmit}>
                    <div className="add-comment-form-input-wrapper">
                        <label className="comment-text-field">
                            <textarea
                                type="text"
                                value={content}
                                placeholder="Add a comment"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </label>
                    </div>
                    <button className="add-comment-submit-button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddComment;
