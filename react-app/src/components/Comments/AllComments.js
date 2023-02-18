import React, { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCommentsThunk } from "../../store/comment";
import SingleComment from "./SingleComment";
import './AllComments.css'

function AllComments({transaction_id}) {

    const dispatch = useDispatch()

    const comments = useSelector(state => state.comments)

    useEffect(() => {
        dispatch(loadCommentsThunk(transaction_id))
    },[dispatch, transaction_id])

    if (!comments) {
        return null;
    }
    const allComments = comments.allComments

    if (!allComments) {
        return null;
    }

    const commentsArr = Object.values(allComments)
    // console.log(allComments)
    // const commentsArr = Object.values(allComments)
    // console.log("commentsArr", commentsArr)
    // const finalCommentsArr = commentsArr[0]
    // console.log(finalCommentsArr)

    return (
        <div className="all-comments-wrapper">
            <div className="all-comments-header">
                *icon* Notes and Comments
            </div>
            <div className="single-comment-container">
                <div className="single-comment-content">
                    {Object.values(commentsArr).map(comment => (
                        <SingleComment comment={comment}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllComments
