import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCommentThunk, loadCommentsThunk } from "../../store/comment";
import "./AddComment.css";

function AddComment({ transaction_id }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");


    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.length || content.length > 500) {
            window.alert(
                "Please enter a valid comment that is less than 500 characters."
            );
            return
        }

        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth() + 1;
        const day = today.getUTCDate();
        const date = `${month}/${day}/${year}`;

        const comment = {
            content,
            transaction_id,
            commentor_id: user.id,
            created_at: date,
            updated_at: date,
        };

        //change this later?
        return dispatch(addCommentThunk(comment, transaction_id))
        .then(setContent(""))
        .then(() => {dispatch(loadCommentsThunk(transaction_id))})
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
