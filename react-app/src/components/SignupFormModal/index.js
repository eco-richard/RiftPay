import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	// const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(/*username, */firstName, lastName, email, password));
			if (data) {
				for (let i = 0; i < data.length; i++) {
					data[i] = data[i].split(" : ")[1].trim();
				}
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-form-container">
			<div className="signup-left-column-container">
				<i className="fa-solid fa-comment-dollar riftpay-icon fa-10x green" id="signup-modal-icon"></i>
			</div>
			<div className="signup-right-column-container">
				<div className="signup-form-header-and-body">
					<div className="signup-form-header">INTRODUCE YOURSELF</div>
					<form className="signup-form-body" onSubmit={handleSubmit}>
						<ul className="signup-errors-container">
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
						<div className="signup-label-input">
							<label>
								My First Name is:
								<input
									className="signup-form-input-field"
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</label>
						</div>
						<div className="signup-label-input">
							<label>
								My Last Name is:
								<input
									className="signup-form-input-field"
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</label>

						</div>
						<div className="signup-label-input">
							<label>
								Here's my email address:
								<input
									className="signup-form-input-field"
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</label>

						</div>
						<div className="signup-label-input">
							<label>
								And here's my password:
								<input
									className="signup-form-input-field"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</label>
						</div>
						<div className="signup-label-input">
							<label>
								Confirm Password
								<input
									className="signup-form-input-field"
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</label>
						</div>
						<button className="signup-form-button" type="submit">Sign Me Up!</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignupFormModal;
