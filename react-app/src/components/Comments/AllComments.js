import React from "react"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllComments.css'

function AllComments() {


    return (
        <div className="all-comments-wrapper">
            <div className="all-comments-header">
                *icon* Notes and Comments
            </div>
            <div className="single-comment-container">
                <div className="single-comment-content">
                    Test Comment
                </div>
            </div>
        </div>
    )
}

export default AllComments
