import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import AboutLinks from "./AboutLinks";
import "./SplashPage.css";

function SplashPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/dashboard" />;

    return (
        <div className="splash-page-wrapper">
            <div className="splash-header-container">
                <div className="splash-header-content">Welcome to RiftPay!</div>
            </div>
            <div className="top-two-tile-container">
                <div className="left-top-tile-container">
                    <div className="left-top-tile-content">
                        <div className="left-tile-text">
                            RiftPay makes it easy to share expenses with anyone,
                            anywhere, at anytime.
                        </div>
                        <div className="icons-container">
                            <span>
                                <i class="fa-solid fa-plane fa-5x green"></i>
                            </span>

                            <span>
                                <i class="fa-solid fa-house fa-5x green"></i>
                            </span>

                            <span>
                                <i class="fa-solid fa-user-group fa-5x green"></i>
                            </span>

                            <span>
                                <i class="fa-solid fa-utensils fa-5x green"></i>
                            </span>

                            <span>
                            <i class="fa-solid fa-file-invoice-dollar fa-5x green"></i>
                            </span>
                        </div>
                        <div className="text-details">
                            <div className="left-tile-text-description">
                                RiftPay helps you keep track of your shared
                                expenses and balances with housemates, trips,
                                groups, friends, and family.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-half-container">
                <div className="bottom-content">
                    <div className="features-list-header">
                        With RiftPay, you will never forget who you owe and who
                        owes you.
                    </div>
                    <div className="features-list-container">
                        <div className="left-features-column-container">
                            <div className="features-content-container">
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-user-group green"></i>
                                        </span>
                                        Add friends and other users
                                    </div>
                                </div>
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-money-check-dollar green"></i>
                                        </span>
                                        Split expenses and track debts
                                    </div>
                                </div>
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-not-equal green"></i>
                                        </span>
                                        Equal or unequal splits
                                    </div>
                                </div>
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-percent green"></i>
                                        </span>
                                        Split by percentage or shares
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-features-column-container">
                            <div className="features-content-container">
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-calculator green"></i>
                                        </span>
                                        Calculate total balances
                                    </div>
                                </div>
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-people-group green"></i>
                                        </span>
                                        Create expenses with multiple people
                                    </div>
                                </div>
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-dollar-sign green"></i>
                                        </span>
                                        Update existing expenses
                                    </div>
                                </div>
                                <div className="single-feature">
                                    <div>
                                        <span>
                                        <i class="fa-solid fa-user-pen green"></i>
                                        </span>
                                        Leave comments for your friends to see
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AboutLinks />
        </div>
    );
}

export default SplashPage;
