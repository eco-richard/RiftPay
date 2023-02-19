import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCommentThunk } from "../../store/comment";
import OpenModalButton from "../OpenModalButton";
import EditCommentFormModal from "../EditCommentFormModal";
import "./SingleComment.css";

function SingleComment({ comment }) {
    const dispatch = useDispatch();

    const removeCommentHandleCLick = async (e) => {
        if (window.confirm("Are you sure you want to remove this comment?")) {
            dispatch(removeCommentThunk(comment));
        }
    };
    // DATE PARSER
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const dateArr = comment.created_at.split("/")
    const day = dateArr[1]
    // console.log(dateArr)
    const monthIdx = parseInt(dateArr[0]) - 1
    const parsedDate = `${monthNames[monthIdx]} ${day}`


    // END OF DATE PARSER
    if (!comment.user) return null;
    return (
        <div className="single-comment-wrapper">
            <div className="single-comment-header">
                <div className="commenter-name-date">
                    <div className="commenter-name">
                        {comment.user.first_name} {comment.user.last_name}
                    </div>
                    <div className="comment-date">
                        {parsedDate}
                    </div>
                </div>
                <div className="single-comment-buttons">
                    <div className="edit-comment-button">
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<EditCommentFormModal comment={comment} />}
                        />
                    </div>
                    <button
                        className="delete-comment-button"
                        onClick={removeCommentHandleCLick}>
                        X
                    </button>
                </div>
            </div>
            <div className="single-comment-content">{comment.content}</div>
        </div>
    );
}

export default SingleComment;
