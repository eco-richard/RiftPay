import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;

	if (sessionUser) {
	  sessionLinks = (
		<div className="logged-in-nav-buttons-container">
		  <div className="profile-button">
			<ProfileButton user={sessionUser} />
		  </div>
		</div>
	  );
	} else {
	  sessionLinks = (
		<div className="logged-out-nav-buttons-container">
		  <div className="login-button">
			<OpenModalButton
			  buttonText="Log In"
			  modalComponent={<LoginFormModal />}
			/>
		  </div>
		  <div className="signup-button">
			<OpenModalButton
			  buttonText="Sign Up"
			  modalComponent={<SignupFormModal />}
			/>
		  </div>
		</div>
	  );
	}

	return (
	  <div className="nav-buttons-container">
		<div className="home-button-container">
		  <NavLink exact to="/">Home</NavLink>
		</div>
		{isLoaded && sessionLinks}
	  </div>
	);
  }

export default Navigation;
