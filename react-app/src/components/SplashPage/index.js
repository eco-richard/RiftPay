import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SplashPage.css";

function SplashPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/dashboard" />;

    return (
        <div className="splash-page-wrapper">
            <div className="splash-header-container">
                <div className="splash-header-content">Welcome to RiftPay!</div>
                {/* <div className="left-tile-text-description-bottom">
                                With RiftPay, you will never forget who you owe
                                and who owes you.
                            </div> */}
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
                            <i class="fa-solid fa-plane fa-5x"></i>
                            </span>

                            <span>
                            <i class="fa-solid fa-house fa-5x"></i>
                            </span>

                            <span>
                            <i class="fa-solid fa-user-group fa-5x"></i>
                            </span>

                            <span>
                            <i class="fa-solid fa-utensils fa-5x"></i>
                            </span>

                        </div>
                        <div className="text-details">
                            <div className="left-tile-text-description">
                                Keep track of your shared expenses and balances
                                with friends and family.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-top-tile-container">
                            <div className="features-list-header">header</div>
                            <div className="features-list-container">
                                <li>test</li>
                                <li>test</li>
                                <li>test</li>

                            </div>

                </div>

            </div>
            {/* <div className="vertical-tile-container">
                <div className="vertical-left-container">
                    <div className="vertical-tile-content-container">
                        <div className="feature-text-wrapper">
                            <div className="feature-header-wrapper">
                                <div className="feature-header">
                                    Track balances
                                </div>
                                <div className="feature-details-wrapper">
                                    <div className="feature-details">
                                        Keep track of shared expenses, balances,
                                        and who owes who.
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="feature-image">!!! FEATURE IMAGE GOES HERE !!!</div>
                    </div>
                </div>
                <div className="vertical-right-container">
                    <div className="vertical-tile-content-container">
                        <div className="feature-text-wrapper">
                            <div className="feature-header-wrapper">
                                <div className="feature-header">
                                    Organize expenses
                                </div>
                                <div className="feature-details-wrapper">
                                    <div className="feature-details">
                                        Split expenses with any group: trips,
                                        housemates, friends, and family.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-image">!!! FEATURE IMAGE GOES HERE !!!</div>
                    </div>
                </div>
            </div>

            <div className="vertical-tile-container">
                <div className="vertical-left-container">
                    <div className="vertical-tile-content-container">
                        <div className="vertical-tile-content-header">
                            <div className="feature-text-wrapper">
                                <div className="feature-header-wrapper">
                                    <div className="feature-header">
                                        Add expenses easily
                                    </div>
                                    <div className="feature-details-wrapper">
                                        <div className="feature-details">
                                            Quickly add expenses on the go
                                            before you forget who paid.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-image">!!! FEATURE IMAGE GOES HERE !!!</div>
                    </div>
                </div>
                <div className="vertical-right-container">
                    <div className="vertical-tile-content-container">
                        <div className="vertical-tile-content-header">
                            <div className="feature-text-wrapper">
                                <div className="feature-header-wrapper">
                                    <div className="feature-header">
                                        Pay friends back
                                    </div>
                                    <div className="feature-details-wrapper">
                                        <div className="feature-details">
                                            Settle up with a friend and record
                                            any cash or online payment.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-image">!!! FEATURE IMAGE GOES HERE !!!</div>
                    </div>
                </div>
            </div> */}

            {/* <div className="features-container">
                <div className="features-header-container">
                    <div className="features-header">
                        The whole nine yards
                    </div>
                    <div className="features-list-container">
                        <div className="features-list-content">
                            <div className="single-feature">

                            <li>TEST</li>
                            <li>TEST</li>
                            <li>TEST</li>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default SplashPage;
