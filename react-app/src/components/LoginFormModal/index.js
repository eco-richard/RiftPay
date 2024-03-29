import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(" : ")[1].trim();
      }
      setErrors(data);
    } else {
      history.push("/dashboard")
      closeModal()
    }
  };


  const logInDemoUser = async (e) => {
    e.preventDefault()
    //made whats commented out is what was there before
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
        history.push("/dashboard")
        closeModal()
    }

    // return dispatch(login("demo@aa.io", "password"))
    //   .then(closeModal).then(history.push("/dashboard"))
  }

  return (
    <div className="login-form-container">
      <div className="login-header">Log In</div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="login-inputs-container">
          <input
            className="login-input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-buttons-container">
          <button className="login-form-button" type="submit">Log In</button>
          <button className="login-form-button" type="submit" onClick={logInDemoUser}>Demo-User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
