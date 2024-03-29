import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateCommentThunk, loadCommentsThunk } from "../../store/comment";
import "./EditCommentForm.css";

function EditCommentFormModal({ comment }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
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

        const updatedComment = {
            id: comment.id,
            content,
            updated_at: date,
        };

        //then doesnt make sense because there is no promise?
        return dispatch(updateCommentThunk(updatedComment, comment.id))
            .then(() => { dispatch(loadCommentsThunk(comment.transaction_id)) })
            .then(closeModal());
    };
    return (
        <div className="edit-comment-form-container">
            <div className="edit-comment-header">Edit Comment</div>
            <form onSubmit={handleSubmit}>
                <div className="edit-comment-label-input">
                        <textarea
                            className="edit-comment-input"
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                </div>
                <button className="edit-comment-form-button" type="submit">
                    Edit
                </button>
            </form>
        </div>
    );
}

export default EditCommentFormModal;
