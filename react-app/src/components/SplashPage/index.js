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
            </div>
            <div className="top-two-tile-container">
                <div className="left-top-tile-container">
                    <div className="left-top-tile-content">
                        <div className="left-tile-text">
                            RiftPay makes it easy to share expenses with anyone,
                            anywhere, at anytime.
                        </div>
                        <div className="icons">ICONS GO HERE</div>
                        <div className="text-details">
                            <div className="left-tile-text-description">
                                Keep track of your shared expenses and balances
                                with friends and family.
                            </div>
                            <div className="left-tile-text-description-bottom">
                                With RiftPay, you will never forget who you owe
                                and who owes you.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-top-tile-container">
                    ICON and stuff goes here ICON
                </div>
            </div>
            <div className="vertical-tile-container">
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
            </div>

            <div className="features-container">FEATURES LIST</div>
        </div>
    );
}

export default SplashPage;
